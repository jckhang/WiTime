var input;
var output;

function setup() {
  canvas = createCanvas(1075,500);
  canvas.position(20,180);
  nameP = createP('Search births by his/her name');
  nameP.position(480,122);
  nameP.mousePressed(gotData);

  input = select('#search');
  var button = select('#submit');
  button.mousePressed(search);
}

function search() {
  var term = input.value();
  var url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&languages=en&format=json' + '&titles=' + term;
  loadJSON(url, gotData, 'jsonp');
}

function gotData(data) {
  var entity = data.entities[Object.keys(data.entities)];
  if (Object.keys(data.entities)=="-1"){
    nameP.html("This is not a name..");
  }else{
    var birthdate = entity.claims.P569[0].mainsnak.datavalue.value.time;
    var deathdate = entity.claims.P570[0].mainsnak.datavalue.value.time;
    var name = entity.labels.en.value
    var birthdateA = birthdate.slice(1,11).split('-');
    var deathdateA = deathdate.slice(1,11).split('-');
    var wordLocationXAa = (birthdateA[0] - 1800) * 5;
    var wordLocationYA = height - (deathdateA[0] - birthdateA[0]) * 5;
    var colorA = (deathdateA[0] - birthdateA[0]) * 2.5;
    var wordContentA = input.value() + " :  " + birthdate.slice(1,11) + " to " + deathdate.slice(1,11)

    nameP.html(birthdate.slice(1,11) + " to " + deathdate.slice(1,11));

    request = $.ajax({
      url: "https://script.google.com/macros/s/AKfycby2WvqsyQa4zO5nQeKzL7QO36S9Ed8BWcFrNBCIL9rfeK7yQ1D_/exec",
      type: "post",
      useDefaultXhrHeader: false,
      data: [birthdate.slice(1,11), deathdate.slice(1,11), name, "","","","","","title",""]
    });
    request.done(function(response, textStatus, jqXHR) {
      // log a message to the console
      $('#result').html('<a href="https://docs.google.com/spreadsheets/d/14mfh_3JhEhWZVWCmw1VfXCvuNAEycUrGQUrcMwI8LNY/pubhtml target="_blank">Success - see Google Sheet</a>');
      console.log("Hooray, it worked!");
    });

    // callback handler that will be called on failure
    request.fail(function(jqXHR, textStatus, errorThrown) {
      // log the error to the console
      console.error(
        "The following error occured: " +
        textStatus, errorThrown
      );
    });

    // callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function() {
      // reenable the inputs
      $inputs.prop("disabled", false);
    });
  }
}

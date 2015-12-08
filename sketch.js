var input;
var output;

function setup() {
  canvas = createCanvas(1075,500);
  canvas.position(20,180);
  nameP = createP('Search births by his/her name');
  nameP.position(250,122);
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

    var birthdateA = birthdate.slice(1,11).split('-');
    var deathdateA = deathdate.slice(1,11).split('-');
    var wordLocationXAa = (birthdateA[0] - 1800) * 5;
    var wordLocationYA = height - (deathdateA[0] - birthdateA[0]) * 5;
    var colorA = (deathdateA[0] - birthdateA[0]) * 2.5;
    var wordContentA = input.value() + " :  " + birthdate.slice(1,11) + " to " + deathdate.slice(1,11)

    nameP.html(birthdate.slice(1,11) + " to " + deathdate.slice(1,11));
    stroke(colorA, 0, 255, 150);
    line(wordLocationXAa, wordLocationYA, wordLocationXAa, height);
    pop();
    push();
    noStroke();
    fill(colorA, 0,255);
    text(wordContentA, wordLocationXAa, (wordLocationYA - 5));
    pop();

  }
}

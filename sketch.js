var input;
var output;

function setup() {
  noCanvas();

  input = select('#search');
  output = select('#date');
  var button = select('#submit');
  button.mousePressed(search);
  timeline = new TL.Timeline('timeline-embed',
      'https://docs.google.com/spreadsheets/d/14mfh_3JhEhWZVWCmw1VfXCvuNAEycUrGQUrcMwI8LNY/pubhtml');
}

function search() {
  var term = input.value();
  var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&format=json' + '&titles=' + term;
  loadJSON(url, gotData, 'jsonp');
}

function gotData(data) {
  for (key in data.query.pages) {

    var birthdeath = (data.query.pages[key].revisions[0]["*"]);

    if (birthdeath.indexOf("|df=yes|") > 0) {
      var deathdateA = (birthdeath.split("{{Death date and age|df=yes|")[1].split("}}")[0].split("|"));
      createP(input.value() + ":" + deathdateA[3] + "-" + deathdateA[0]);

    }
    if ((birthdeath.indexOf("df=y}}") > 0) || (birthdeath.indexOf("mf=y") > 0)) {
      var deathdateB = (birthdeath.split("{{death date and age|")[1].split("}}")[0].split("|"));
      createP(input.value() + ":" + deathdateB[3] + "-" + deathdateB[0]);

    }
    var timeline_json = {
        "media": {
          "url": "",
          "caption": "",
          "credit": ""
        },
        "start_date": {
          "year": deathdateB[3]
          "month": "8"
          "day": "11"
        },
        "text": {
          "headline": input.value(),
          "text": input.value(),
        }
      }

     // you write this part
    // two arguments: the id of the Timeline container (no '#')
    // and the JSON object or an instance of TL.TimelineConfig created from
    // a suitable JSON object
    window.timeline = new TL.Timeline('timeline-embed', timeline_json);

  }
}

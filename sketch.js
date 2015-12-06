var input;
var output;

function setup() {
  noCanvas();

  input = select('#search');
  output = select('#date');
  var button = select('#submit');
  button.mousePressed(search);
}

function search() {
  var term = input.value();
  //var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&format=json' + '&titles=' + term;
  var url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&languages=en&format=json' + '&titles=' + term;
  loadJSON(url, gotData, 'jsonp');
}

function gotData(data) {
  var entity = data.entities
  var birthdate = entity.claims.P569[0].mainsnak.datavalue.value.time
  var deathdate = entity.claims.P570[0].mainsnak.datavalue.value.time
  createP(input.value() + ":" + birthdate + "-" + deathdate);

}

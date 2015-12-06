var input;
var button;
var slider;
var nameP;
var h1;
var canvas;

function setup() {
    canvas = createCanvas(1075,500);
    canvas.position(20,180);

  background(0);
  nameP = createP('Search births by his/her name');
  nameP.position(220,92);
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
  //clear();
  var entity = data.entities[Object.keys(data.entities)]
  if (Object.keys(data.entities)=="-1"){
    createP('Wrong Name');
  }else{
    var birthdate = entity.claims.P569[0].mainsnak.datavalue.value.time
    var deathdate = entity.claims.P570[0].mainsnak.datavalue.value.time
    createP(input.value() + " :  " + birthdate.slice(1,11) + " to " + deathdate.slice(1,11));

    var deathdateA = (birthdeath.split("{{Death date and age|df=yes|")[1].split("}}")[0].split("|"));
    var wordLocationXAa = (deathdateA[3] - 1800) * 5;
    var wordLocationXAb = (deathdateA[0] - 1800) * 5;
    var wordLocationYA = height - (deathdateA[0] - deathdateA[3]) * 5;
    var colorA = (deathdateA[0] - deathdateA[3]) * 2.5;
    var wordContentA = input.value() + ":" + deathdateA[3] + "-" + deathdateA[0];

    nameP.html(deathdateA[3] + "-" + deathdateA[0]);
    stroke(colorA, 0, 255, 150);
    line(wordLocationXAa, wordLocationYA, wordLocationXAa, height);
    pop();
    push();
    noStroke();
    fill(colorA, 0,255);
    text(wordContentA, wordLocationXAa, (wordLocationYA - 5));
    pop();
    break;
}

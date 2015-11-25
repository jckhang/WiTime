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
  var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&format=json' + '&titles=' + term;
  loadJSON(url, gotData, 'jsonp');
}

function gotData(data) {
  for (key in data.query.pages) {

    var birthdeath = (data.query.pages[key].revisions[0]["*"]);

    if (birthdeath.indexOf("|df=yes|") > 0) {
      var deathdateA = (birthdeath.split("{{Death date and age|df=yes|")[1].split("}}")[0].split("|"));
      createP(input.value() + ":" + deathdateA[3] + "-" + deathdateA[0]);
      var item = [
      	{Name: input.value()},
      	{Birth_Death: deathdateA[3] + "-" + deathdateA[0]}
      ];
      var row = $j.tr({ child:[$j.td(item.Name), $j.td(item.Birth_)] });
    	nameTable.appendChild(row.dom());

    }
    if ((birthdeath.indexOf("df=y}}") > 0) || (birthdeath.indexOf("mf=y") > 0)) {
      var deathdateB = (birthdeath.split("{{death date and age|")[1].split("}}")[0].split("|"));
      createP(input.value() + ":" + deathdateB[3] + "-" + deathdateB[0]);

    }

  }
}

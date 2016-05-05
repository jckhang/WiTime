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
  var url = 'https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&rvsection=0&format=json' + '&titles=' + term;
  loadJSON(url, gotData, 'jsonp');


}

function gotData(data) {
  //clear();
  wikiData = data;
  for (key in wikiData.query.pages) {
    if (key == -1) {
      nameP.html("Found nothing in wikipedia");
      break;
    }

    var birthdeath = (wikiData.query.pages[key].revisions[0]["*"]);
    var ruleBe = !(birthdeath.indexOf("birth_date") > 0);
    var ruleBf = !(birthdeath.indexOf("born") > 0);
    if ((ruleBe) && (ruleBf)) {
      nameP.html("This is not a name..");
      break;
    }
    //var i = random(10,190);
    var ruleDa = (birthdeath.indexOf("Death date and age|df=yes|") > 0) && (birthdeath.indexOf("| death_date") > 0);
    var ruleDb = (birthdeath.indexOf("death date and age|df=yes|") > 0) && (birthdeath.indexOf("| death_date") > 0);
    var ruleDc = (birthdeath.indexOf("death date and age") > 0) && (birthdeath.indexOf("df=y") > 0);
    var ruleDd = (birthdeath.indexOf("death date and age|") > 0) && (birthdeath.indexOf("mf=y}}") > 0);
    var ruleDe = (birthdeath.indexOf("Death date and age|") > 0) && (birthdeath.indexOf("mf=yes}}") > 0);
    var ruleDf = (birthdeath.indexOf("Death date and age|")>0) && (birthdeath.indexOf("mf=y}}") > 0);
    var ruleDg = (birthdeath.indexOf("Death date and age|mf=yes") > 0);
    var ruleDh = ((birthdeath.indexOf("Death date and age") > 0) && (birthdeath.indexOf("df=y") > 0))||(birthdeath.indexOf("Death date and age") > 0);
    var ruleDi = (birthdeath.indexOf("death date and age") > 0) && (birthdeath.indexOf("mdy=yes") > 0);
    var ruleDlast = (birthdeath.indexOf("death date and age") > 0);
    var ruleDlastA = (birthdeath.indexOf("Death date and age") > 0);
    
    var ruleBa = (birthdeath.indexOf("birth_date") > 0) && ((birthdeath.indexOf("Birth date and age|YYYY|MM|DD") > 0));
    var ruleBb = (birthdeath.indexOf("Birth date and age|1") > 0);
    var ruleBc = (birthdeath.indexOf("Birth year and age|") > 0);
    var ruleBd = (birthdeath.indexOf("Birth date and age|mf=yes|") > 0);
    var ruleBe = (birthdeath.indexOf("born") > 0);
    var ruleBf = (birthdeath.indexOf("birth date and age|df=yes|") > 0);
    


    if (ruleDa) {
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
    if (ruleDb) {
      var deathdateB = (birthdeath.split("{{death date and age|df=yes|")[1].split("}}")[0].split("|"));
      var wordLocationXBa = (deathdateB[3] - 1800) * 5;
      var wordLocationXBb = (deathdateB[0] - 1800) * 5;
      var wordLocationYB = height - (deathdateB[0] - deathdateB[3]) * 5;
      var colorB = (deathdateB[0] - deathdateB[3]) * 2.5;
      var wordContentB = input.value() + ":" + deathdateB[3] + "-" + deathdateB[0];

      nameP.html(deathdateB[3] + "-" + deathdateB[0]);
      stroke(colorB, 0,255,150);
      line(wordLocationXBa, wordLocationYB, wordLocationXBa, height);
      pop();
      push();
      noStroke();
      fill(colorB, 0,255);
      text(wordContentB, wordLocationXBa, (wordLocationYB - 5));
      pop();
      break;

    }
    if (ruleDc) {
      var deathdateC = (birthdeath.split("{{death date and age")[1].split("}}")[0].split("|"));
      var wordLocationXCa = (deathdateC[4] - 1800) * 5;
      var wordLocationXCb = (deathdateC[1] - 1800) * 5;
      var wordLocationYC = height - (deathdateC[1] - deathdateC[4]) * 5;
      var colorC = (deathdateC[1] - deathdateC[4]) * 2.5;
      var wordContentC = input.value() + ":" + deathdateC[4] + "-" + deathdateC[1];

      nameP.html(deathdateC[4] + "-" + deathdateC[1]);
      stroke(colorC, 0,255,150);
      line(wordLocationXCa, wordLocationYC, wordLocationXCa, height);
      pop();
      push();
      noStroke();
      fill(colorC, 0,255);
      text(wordContentC, wordLocationXCa, (wordLocationYC - 5));
      pop();
      break;
    }
    if (ruleDd) {
      var deathdateD = (birthdeath.split("{{death date and age|")[1].split("}}")[0].split("|"));
      var wordLocationXDa = (deathdateD[3] - 1800) * 5;
      var wordLocationXDb = (deathdateD[0] - 1800) * 5;
      var wordLocationYD = height - (deathdateD[0] - deathdateD[3]) * 5;
      var colorD = (deathdateD[0] - deathdateD[3]) * 2.5;
      var wordContentD = input.value() + ":" + deathdateD[3] + "-" + deathdateD[0];

      nameP.html(deathdateD[3] + "-" + deathdateD[0]);
      stroke(colorD, 0,255,150);
      line(wordLocationXDa, wordLocationYD, wordLocationXDa, height);
      pop();
      push();
      noStroke();
      fill(colorD, 0,255);
      text(wordContentD, wordLocationXDa, (wordLocationYD - 5));
      pop();
      break;
    }
    if (ruleDe) {
      var deathdateE = (birthdeath.split("{{Death date and age|")[1].split("}}")[0].split("|"));
      var wordLocationXEa = (deathdateE[3] - 1800) * 5;
      var wordLocationXEb = (deathdateE[0] - 1800) * 5;
      var wordLocationYE = height - (deathdateE[0] - deathdateE[3]) * 5;
      var colorE = (deathdateE[0] - deathdateE[3]) * 2.5;
      var wordContentE = input.value() + ":" + deathdateE[3] + "-" + deathdateE[0];

      nameP.html(deathdateE[3] + "-" + deathdateE[0]);
      stroke(colorE, 0,255,150);
      line(wordLocationXEa, wordLocationYE, wordLocationXEa, height);
      pop();
      push();
      noStroke();
      fill(colorE, 0,255);
      text(wordContentE, wordLocationXEa, (wordLocationYE - 5));
      pop();
      break;
    }
    if (ruleDf) {
      var deathdateF = (birthdeath.split("{{Death date and age|")[1].split("}}")[0].split("|"));
      var wordLocationXFa = (deathdateF[3] - 1800) * 5;
      var wordLocationXFb = (deathdateF[0] - 1800) * 5;
      var wordLocationYF = height - (deathdateF[0] - deathdateF[3]) * 5;
      var colorF = (deathdateF[0] - deathdateF[3]) * 2.5;
      var wordContentF = input.value() + ":" + deathdateF[3] + "-" + deathdateF[0];

      nameP.html(deathdateF[3] + "-" + deathdateF[0]);
      stroke(colorF, 0,255,150);
      line(wordLocationXFa, wordLocationYF, wordLocationXFa, height);
      pop();
      push();
      noStroke();
      fill(colorF, 0,255);
      text(wordContentF, wordLocationXFa, (wordLocationYF - 5));
      pop();
      break;

    }
    if (ruleDg) {
      var deathdateG = (birthdeath.split("{{Death date and age|mf=yes")[1].split("}}")[0].split("|"));
      var wordLocationXGa = (deathdateG[4] - 1800) * 5;
      var wordLocationXGb = (deathdateG[1] - 1800) * 5;
      var wordLocationYG = height - (deathdateG[1] - deathdateG[4]) * 5;
      var colorG = (deathdateG[1] - deathdateG[4]) * 2.5;
      var wordContentG = input.value() + ":" + deathdateG[4] + "-" + deathdateG[1];

      nameP.html(deathdateG[4] + "-" + deathdateG[1]);
      stroke(colorG, 0,255,150);
      line(wordLocationXGa, wordLocationYG, wordLocationXGa, height);
      pop();
      push();
      noStroke();
      fill(colorG, 0,255);
      text(wordContentG, wordLocationXGa, (wordLocationYG - 5));
      pop();
      break;
      
    }
    if (ruleDh) {
      var deathdateH = (birthdeath.split("{{Death date and age")[1].split("}}")[0].split("|"));
      var wordLocationXHa = (deathdateH[4] - 1800) * 5;
      var wordLocationXHb = (deathdateH[1] - 1800) * 5;
      var wordLocationYH = height - (deathdateH[1] - deathdateH[4]) * 5;
      var colorH = (deathdateH[1] - deathdateH[4]) * 2.5;
      var wordContentH = input.value() + ":" + deathdateH[4] + "-" + deathdateH[1];

      nameP.html(deathdateH[4] + "-" + deathdateH[1]);
      stroke(colorH, 0,255,150);
      line(wordLocationXHa, wordLocationYH, wordLocationXHa, height);
      pop();
      push();
      noStroke();
      fill(colorH, 0,255);
      text(wordContentH, wordLocationXHa, (wordLocationYH - 5));
      pop();
      break;
    }
    if (ruleDi) {
      var deathdateI = (birthdeath.split("{{death date and age|")[1].split("}}")[0].split("|"));
      var wordLocationXIa = (deathdateI[3] - 1800) * 5;
      var wordLocationXIb = (deathdateI[0] - 1800) * 5;
      var wordLocationYI = height - (deathdateI[0] - deathdateI[3]) * 5;
      var colorI = (deathdateI[0] - deathdateI[3]) * 2.5;
      var wordContentI = input.value() + ":" + deathdateI[3] + "-" + deathdateI[0];

      nameP.html(deathdateI[3] + "-" + deathdateI[0]);
      stroke(colorI, 0,255,150);
      line(wordLocationXIa, wordLocationYI, wordLocationXIa, height);
      pop();
      push();
      noStroke();
      fill(colorI, 0,255);
      text(wordContentI, wordLocationXIa, (wordLocationYI - 5));
      pop();
      break;
    }
    if (ruleDlast) {
      var deathdateLast = (birthdeath.split("{{death date and age")[1].split("}}")[0].split("|"));
      var wordLocationXLasta = (deathdateLast[4] - 1800) * 5;
      var wordLocationXLastb = (deathdateLast[1] - 1800) * 5;
      var wordLocationYLast = height - (deathdateLast[1] - deathdateLast[4]) * 5;
      var colorLast = (deathdateLast[1] - deathdateLast[4]) * 2.5;
      var wordContentLast = input.value() + ":" + deathdateLast[4] + "-" + deathdateLast[1];

      nameP.html(deathdateLast[4] + "-" + deathdateLast[1]);
      stroke(colorLast, 0,255,150);
      line(wordLocationXLasta, wordLocationYLast, wordLocationXLasta, height);
      pop();
      push();
      noStroke();
      fill(colorLast, 0,255);
      text(wordContentLast, wordLocationXLasta, (wordLocationYLast - 5));
      pop();
      break;
    }
    if (ruleDlastA) {
      var deathdateLastA = (birthdeath.split("{{Death date and age")[1].split("}}")[0].split("|"));
      var wordLocationXLastAa = (deathdateLastA[4] - 1800) * 5;
      var wordLocationXLastAb = (deathdateLastA[1] - 1800) * 5;
      var wordLocationYLastA = height - (deathdateLastA[1] - deathdateLastA[4]) * 5;
      var colorLastA = (deathdateLastA[1] - deathdateLastA[4]) * 2.5;
      var wordContentLastA = input.value() + ":" + deathdateLastA[4] + "-" + deathdateLastA[1];

      nameP.html(deathdateLastA[4] + "-" + deathdateLastA[1]);
      stroke(colorLastA, 0,255,150);
      line(wordLocationXLastAa, wordLocationYLastA, wordLocationXLastAa, height);
      pop();
      push();
      noStroke();
      fill(colorLastA, 0,255);
      text(wordContentLastA, wordLocationXLastAa, (wordLocationYLastA - 5));
      pop();
      break;
    }
    if (ruleBa) {
      var birthdateA = (birthdeath.split("| birth_date    = ")[1].split(" <!")[0]);
      var wordLocationXBA = (birthdateA - 1800) * 5;
      var wordLocationYBA = height - (2015 - birthdateA) * 5;
      var colorBA = (2015 - birthdateA) * 2.5;
      var wordContentBA = input.value() + ":" + birthdateA + "-";
      nameP.html(input.value() + ":" + birthdateA + "-");

      stroke(colorBA, 255, 0, 150);
      line(wordLocationXBA, wordLocationYBA, wordLocationXBA, height);
      pop();
      push();
      noStroke();
      fill(colorBA, 255, 0);
      text(wordContentBA, wordLocationXBA, (wordLocationYBA - 5));
      pop();
      break;
    }
    if (ruleBb) {
      var birthdateB = (birthdeath.split("Birth date and age|")[1].split("}}")[0].split("|"));
      var wordLocationXBB = (birthdateB[0] - 1800) * 5;
      var wordLocationYBB = height - (2015 - birthdateB[0]) * 5;
      var colorBB = (2015 - birthdateB[0]) * 2.5;
      var wordContentBB = input.value() + ":" + birthdateB[0] + "-";

      nameP.html(birthdateB[0] + "-");
      stroke(colorBB, 255, 0, 150);
      line(wordLocationXBB, wordLocationYBB, wordLocationXBB, height);
      pop();
      push();
      noStroke();
      fill(colorBB, 255, 0);
      text(wordContentBB, wordLocationXBB, (wordLocationYBB - 5));
      pop();
      break;

    }
    if (ruleBc) {
      var birthdateC = (birthdeath.split("Birth year and age|")[1].split("}}")[0]);
      var wordLocationXBC = (birthdateC - 1800) * 5;
      var wordLocationYBC = height - (2015 - birthdateC) * 5;
      var colorBC = (2015 - birthdateC) * 2.5;
      var wordContentBC = input.value() + ":" + birthdateC + "-";

      nameP.html(birthdateC + "-");
      stroke(colorBC, 255, 0, 150);
      line(wordLocationXBC, wordLocationYBC, wordLocationXBC, height);
      pop();
      push();
      noStroke();
      fill(colorBC, 255, 0);
      text(wordContentBC, wordLocationXBC, (wordLocationYBC - 5));
      pop();
      break;

    }
    if (ruleBd) {
      var birthdateD = (birthdeath.split("Birth date and age|mf=yes|")[1].split("}}")[0].split("|"));
      var wordLocationXBD = (birthdateD[0] - 1800) * 5;
      var wordLocationYBD = height - (2015 - birthdateD[0]) * 5;
      var colorBD = (2015 - birthdateD[0]) * 2.5;
      var wordContentBD = input.value() + ":" + birthdateD[0] + "-";

      nameP.html(birthdateD[0] + "-");
      stroke(colorBD, 255, 0 ,150);
      line(wordLocationXBD, wordLocationYBD, wordLocationXBD, height);
      pop();
      push();
      noStroke();
      fill(colorBD, 255, 0);
      text(wordContentBD, wordLocationXBD, (wordLocationYBD - 5));
      pop();
      break;


    }
    if (ruleBe) {
      var birthdateE = (birthdeath.split("(born ")[1].split(" [")[0]);
      var numBe = Number(birthdateE[9] + birthdateE[10] + birthdateE[11] + birthdateE[12]); // or parseInt()
      var wordLocationXBE = (numBe - 1800) * 5;
      var wordLocationYBE = height - (2015 - numBe) * 5;
      var colorBE = (2015 - numBe) * 2.5;
      var wordContentBE = input.value() + ":" + numBe + "-";

      nameP.html(numBe + "-");
      stroke(colorBE, 255, 0, 150);
      line(wordLocationXBE, wordLocationYBE, wordLocationXBE, height);
      pop();
      push();
      noStroke();
      fill(colorBE, 255, 0);
      text(wordContentBE, wordLocationXBE, (wordLocationYBE - 5));
      pop();
      break;

    }
    if (ruleBf) {
      var birthdateF = (birthdeath.split("birth date and age|df=yes|")[1].split("}}")[0].split("|"));
      var wordLocationXBF = (birthdateF[0] - 1800) * 5;
      var wordLocationYBF = height - (2015 - birthdateF[0]) * 5;
      var colorBF = (2015 - birthdateF[0]) * 2.5;
      var wordContentBF = input.value() + ":" + birthdateF[0] + "-";

      nameP.html(birthdateF[0] + "-");
      stroke(colorBF, 255, 0 ,150);
      line(wordLocationXBF, wordLocationYBF, wordLocationXBF, height);
      pop();
      push();
      noStroke();
      fill(colorBF, 255, 0);
      text(wordContentBF, wordLocationXBF, (wordLocationYBF - 5));
      pop();
      break;


    }
  }
}



// function draw() {
// var btn = document.getElementById('submit');
//     btn.addEventListener('click', function() {
//       //randomSeed(5);
//   fill(100, 200, 10);
//       rect(10, random(height), random(width), 10);
//   });
//   }


//   if (wikiData) {
//     for (var i = 0; i < height; i++ ){
//     fill(100, 200, 10);
//     randomSeed(4);
//       rect(10, random(height), random(width), 10);
// }
//}


// var X_AXIS = 2;
//       var c1;
//       c1 = color(0);
//       c2 = color(colorBA, 255, 0, colorBA);
//       setGradient(50, 190, 540, 80, c2, c1, X_AXIS);

//       createP(input.value() + ":" + birthdateA + "-");

//       function setGradient(x, y, w, h, c1, c2, axis) {

//         noFill();
//         if (axis == X_AXIS) {
//           for (var i = wordLocationXBA; i <= x + w; i++) {
//             var inter = map(i, x, x + w, 0, 1);
//             var c = lerpColor(c1, c2, inter);
//             stroke(c);
//             line(i, wordLocationYBA, i, wordLocationYBA + 1);
//           }
//         }
//       }
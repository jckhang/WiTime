var input;
var button;
var slider;
var nameP;
var h1;
var canvas;


function geoFindMe() {

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        // var latitude = 39.92363;
        // var longitude = 116.360698;

    };

    function error() {
        console.log("Unable to retrieve your location");
        latitude = 'NaN';
        longitude = 'NaN';
    };

    console.log("Locating…");


    navigator.geolocation.getCurrentPosition(success, error);
}

function drawPeople() {
    $.getJSON("/draw")
        .done(function(data) {
            data.forEach(function(element, index) {
                var deathYear = element['_id']['death'],
                    birthYear = element['_id']['birth'],
                    name = element['_id']['name'];

                if (element['_id']['death'] < 2016) {
                    var color = (deathYear - birthYear) * 2.5
                    var wordLocationXa = (birthYear - 1800) * 5;
                    var wordLocationXb = (deathYear - 1800) * 5;
                    var wordLocationY = height - (deathYear - birthYear) * 5;
                    var wordContent = name + ":" + birthYear + "-" + deathYear;
                    stroke(color, 0, 255, 150);
                    line(wordLocationXa, wordLocationY, wordLocationXa, height);
                    pop();
                    push();
                    noStroke();
                    fill(color, 0, 255);
                    text(wordContent, wordLocationXa, (wordLocationY - 5));
                    pop();
                } else {
                    var color = (deathYear - birthYear) * 2.5
                    var wordLocationXa = (birthYear - 1800) * 5;
                    var wordLocationXb = (deathYear - 1800) * 5;
                    var wordLocationY = height - (deathYear - birthYear) * 5;
                    var wordContent = name + ":" + birthYear + "-" + deathYear;

                    stroke(color, 255, 0, 150);
                    line(wordLocationXa, wordLocationY, wordLocationXa, height);
                    pop();
                    push();
                    noStroke();
                    fill(color, 255, 0);
                    text(wordContent, wordLocationXa, (wordLocationY - 5));
                    pop();
                };
            });
        });
}

function setup() {
    canvas = createCanvas(1075, 500);
    canvas.position(20, 180);

    background(0);
    nameP = createP('Search births by his/her name');
    nameP.position(220, 92);
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
    if (Object.keys(data.entities) == "-1") {
        nameP.html("This is not a name..");
    } else {
        if (entity.claims.P570) {
            var birthdate = entity.claims.P569[0].mainsnak.datavalue.value.time;
            var deathdate = entity.claims.P570[0].mainsnak.datavalue.value.time;
            var name = entity.labels.en.value
            nameP.html(birthdate.slice(1, 11) + " to " + deathdate.slice(1, 11));
            if (request) {
                request.abort();
            }
            var request;
            var formData = { "Start Date": birthdate.slice(1, 11), "End Date": deathdate.slice(1, 11), "Headline": name, "Text": name, "Media": "", "Media Credit": "", "Media Caption": "", "Media Thumbnail": "", "Type": "title", "Tag": "" };
            request = $.ajax({
                url: "https://script.google.com/macros/s/AKfycby2WvqsyQa4zO5nQeKzL7QO36S9Ed8BWcFrNBCIL9rfeK7yQ1D_/exec",
                type: "post",
                useDefaultXhrHeader: false,
                data: formData
            });
            var birthYear = birthdate.slice(1, 5)
            var deathYear = deathdate.slice(1, 5)
            var color = (deathYear - birthYear) * 2.5
            var wordLocationXa = (birthYear - 1800) * 5;
            var wordLocationXb = (deathYear - 1800) * 5;
            var wordLocationY = height - (deathYear - birthYear) * 5;
            var wordContent = input.value() + ":" + birthYear + "-" + deathYear;

            nameP.html(birthYear + "-" + deathYear);
            stroke(color, 0, 255, 150);
            line(wordLocationXa, wordLocationY, wordLocationXa, height);
            pop();
            push();
            noStroke();
            fill(color, 0, 255);
            text(wordContent, wordLocationXa, (wordLocationY - 5));
            pop();
            $.ajax({
                method: "POST",
                url: '/peoples',
                data: {
                    'name': name,
                    'birth': birthYear,
                    'death': deathYear,
                    'latitude': window.latitude,
                    'longitude': window.longitude
                },
                dataType: 'json'
            });

        } else {
            var birthdate = entity.claims.P569[0].mainsnak.datavalue.value.time;
            var name = entity.labels.en.value
            nameP.html(birthdate.slice(1, 11) + " until now.");
            if (request) {
                request.abort();
            }
            var request;
            var formData = { "Start Date": birthdate.slice(1, 11), "End Date": "", "Headline": name, "Text": name, "Media": "", "Media Credit": "", "Media Caption": "", "Media Thumbnail": "", "Type": "title", "Tag": "" };
            request = $.ajax({
                url: "https://script.google.com/macros/s/AKfycby2WvqsyQa4zO5nQeKzL7QO36S9Ed8BWcFrNBCIL9rfeK7yQ1D_/exec",
                type: "post",
                useDefaultXhrHeader: false,
                data: formData
            });
            var birthYear = birthdate.slice(1, 5)
            var deathYear = 2016
            var color = (deathYear - birthYear) * 2.5
            var wordLocationXa = (birthYear - 1800) * 5;
            var wordLocationXb = (deathYear - 1800) * 5;
            var wordLocationY = height - (deathYear - birthYear) * 5;
            var wordContent = input.value() + ":" + birthYear + "-" + deathYear;
            nameP.html(birthYear + "-" + deathYear);
            stroke(color, 255, 0, 150);
            line(wordLocationXa, wordLocationY, wordLocationXa, height);
            pop();
            push();
            noStroke();
            fill(color, 255, 0);
            text(wordContent, wordLocationXa, (wordLocationY - 5));
            pop();
            $.ajax({
                method: "POST",
                url: '/peoples',
                data: {
                    'name': name,
                    'birth': birthYear,
                    'death': deathYear,
                    'latitude': window.latitude,
                    'longitude': window.longitude
                },
                dataType: 'json'
            });

        }
    }
}
geoFindMe();
drawPeople();

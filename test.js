var url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&sites=enwiki&languages=en&format=json&titles=Jackson%20Pollock';
$.getJSON(url, function(json){
  var entity = json.entities;
  var birthdate = entity.claims.P569[0].mainsnak.datavalue.value.time;
  var deathdate = entity.claims.P570[0].mainsnak.datavalue.value.time;
});

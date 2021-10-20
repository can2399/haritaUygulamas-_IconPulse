let config = {
    minZoom: 3,
    maxZoom: 20,
    zoomControl: false, // zoom control off (sol tarafta + - butonunu iptal eder
    dragging: true, // false yazılırsa, mouse ile tutup çekme iptal eder.
    attributionControl:true // false yazılırsa, haritayı yukarı aşağı indirip yükseltme iptal eder. 
  };
  
  // magnification with which the map will start
  const zoom = 10;
  // co-ordinates
  const lat = 39.941974;
  const lng = 32.854371;
  
  // calling map
  
  var map = L.map('map', config).setView([lat, lng], zoom);
  //  method fitBounds sets a map view                 
  
  var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}];


L.geoJSON(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
}).addTo(map);

var pulsingIcon = L.icon.pulse({iconSize:[10,10],color:'red'});

var marker = L.marker([52.9167,13.9333],{icon: pulsingIcon}).addTo(map);


console.log(program2['features'].length);

console.log(program2['features'][0]['geometry']['coordinates'][0]);

var enlem = program2.features[0].geometry.coordinates[0];
var boylam = program2.features[0].geometry.coordinates[1];
console.log(enlem,boylam);
console.log(program2.features[0].properties.name);

for(var i = 0; i < program2.features.length; i++){
    var enlem = program2.features[i].geometry.coordinates[0];
    var boylam = program2.features[i].geometry.coordinates[1];
    var programaAlinanMahalle = program2.features[i].properties.name;
    var programaAlinanTasinmazAdet = program2.features[i].properties.adet;
    var markerIsim = 'marker'+'_'+i;
    console.log(markerIsim);
    var markerIsim = L.marker([boylam,enlem],{icon:pulsingIcon}).bindPopup('<b>'+ programaAlinanMahalle + '</b><br>' + 'Programa Alınan Taşınmaz Sayısı : ' +'<b>'+ programaAlinanTasinmazAdet + '</b>').addTo(map);
}








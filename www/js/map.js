

var map = L.map('map').setView([4.7498,-74.1133], 18); // Andalucía

var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {

    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors'
}).addTo(map);

// function popUpInfo(feature, layer) {
//     // does this feature have a property named popupContent?
//     if (feature.properties ) {
//         layer.bindPopup(feature.properties.PCUDESCRIP+"<br>"+"Estacion: "+console.log(feature.properties.PCUDESCRIP)+feature.properties.PCUNOMEST+"<br>"+"CAI: : "+feature.properties.PCUNOMCAI+"<br>"+"Telefono: "+feature.properties.PCUTELEFON);
        
//     }
// }

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng) // Sets the geographical point where the popup will open.
//         .setContent("Has hecho click en la coordenada:<br> " +  e.latlng.lat.toString() + "," +  e.latlng.lng.toString()) // Sets the HTML content of the popup.
//         .openOn(map); // Adds the popup to the map and closes the previous one. 
// }

// map.on('click', onMapClick);

  L.geoJson(cuadrantes, {
    // onEachFeature: popUpInfo,
    fillOpacity: 0,
    }).addTo(map);

//===================================== Ubicacion ================================================== 
        
          document.getElementById("getPosition").addEventListener("click", getPosition);
          // document.getElementById("watchPosition").addEventListener("click", watchPosition); 

          function getPosition() {
            var options = {
               enableHighAccuracy: true,
               maximumAge: 3600000
            }
            var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

            function onSuccess(position){
              lat = position.coords.latitude;
              lon = position.coords.longitude;
              geo(lat,lon);
            };

            function onError(error) {
               alert('code: '    + error.code    + '\n' + 'Error de geolocalización: ' + error.message + '\n');
            }
         }

         function geo(Lat,Lon){
          map.setView([Lat,Lon], 18);
          L.marker([Lat, Lon]).addTo(map);
         };
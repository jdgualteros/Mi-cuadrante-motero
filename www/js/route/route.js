/////////////////////////////// ROUTE ////////////////////////////////////////77
  var theCircle, markers;
  var selPts = [];

  function SelectPoints(lat,lon){
    xy = [lat,lon];  //center point of circle
    dist = 1;  // 150 miles, 
    var theRadius = dist * 600  //1609.34 meters in a mile 
    
    selPts.length =0;  //Reset the array if selecting new points
    
    markers.eachLayer(function (layer) {
      
      // Lat, long of current point as it loops through.
      layer_lat_long = layer.getLatLng();
      
      // Distance from our circle marker To current point in meters
      distance_from_centerPoint = layer_lat_long.distanceTo(xy);
      
      // See if meters is within radius, add the to array
      if (distance_from_centerPoint <= theRadius) {
         selPts.push(layer.feature);  
      }
    
    });
  
    // draw circle to see the selection area
    theCircle = L.circle(xy, theRadius , {   /// Number is in Meters
      color: 'blue',
      fillOpacity: 0.2,
      opacity: 0.5
    }).addTo(map);
    
    //Symbolize the Selected Points
       markers = L.geoJson(selPts, {
       
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
          radius: 4, //expressed in pixels circle size
          color: "red", 
          stroke: true,
          weight: 7,    //outline width  increased width to look like a filled circle.
          fillOpcaity: 1
          });
          }
      });
      //Add selected points back into map as green circles.
      map.addLayer(markers);
      
      //Take array of features and make a GeoJSON feature collection 
      var GeoJS = { type: "FeatureCollection",  features: selPts   };
      //Show number of selected features.
      console.log(GeoJS.features.length +" Cuadrantes seleccionados");
       // show selected GEOJSON data in console
      console.log(JSON.stringify(GeoJS.features))
  }; //end of SelectPoints function



function geousuario(latusuario, lonusuario){

        L.DomEvent.on(
          document.getElementById('getPosition'),'click',function() {
            map.closePopup();
            console.log('cambiar ubicacion!') ;
            map.removeLayer(usuario),
            // map.removeControl(cll17),
            map.removeControl(ochenta)
            // map.removeControl(sieteagosto)

                if (theCircle != undefined) {
                  map.removeLayer(theCircle);
                };
                if (markers != undefined) {
                    map.removeLayer(markers);
                };

            } // Handler function
      );

      var ochenta = L.Routing.control(L.extend(window.lrmConfig, {
        waypoints: [
          startIcon = L.latLng(latusuario,lonusuario),        //usuario
          destinationIcon = L.latLng(coordsmoto[0], coordsmoto[1])
          // L.latLng(4.7576,-74.1545) //80
          // L.latLng(lugares[0])
        ],

        // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
        language: 'es', 
        routeWhileDragging: true,
        reverseWaypoints: false,
        showAlternatives: true,
        fitSelectedRoutes: false,
        altLineOptions: {
          styles: [
            {color: 'black', opacity: 0.15, weight: 9},
            {color: 'white', opacity: 0.8, weight: 6},
            {color: 'blue', opacity: 0.5, weight: 2}
          ]
        }

      }));

 

      ochenta.addTo(map);
      // ochenta.hide();

         }

      // var cll17 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.6082,-74.0794) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: false,
      //   showAlternatives: true,
      //   altLineOptions: {
      //     styles: [
      //       {color: 'black', opacity: 0.15, weight: 9},
      //       {color: 'white', opacity: 0.8, weight: 6},
      //       {color: 'blue', opacity: 0.5, weight: 2}
      //     ]
      //   }

      // })).addTo(map);

      // cll17.hide();

      // var sieteagosto = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.658754, -74.072754) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      //   altLineOptions: {
      //     styles: [
      //       {color: 'black', opacity: 0.15, weight: 9},
      //       {color: 'white', opacity: 0.8, weight: 6},
      //       {color: 'blue', opacity: 0.5, weight: 2}
      //     ]
      //   }
      // })).addTo(map);

      // sieteagosto.hide();

      // ochenta.on('routesfound', function (e) {
      //   distance80 = e.routes[0].summary.totalDistance;
      //   time80 = e.routes[0].summary.totalTime
      //   console.log("time80",time80/60 + " min");
      //   console.log("distancia80",distance80); 

      //         cll17.on('routesfound', function (e) {
      //         distance17 = e.routes[0].summary.totalDistance;
      //         time17 = e.routes[0].summary.totalTime
      //         console.log("time17",time17/60 + " min");
      //         console.log("distancia17",distance17),

      //               sieteagosto.on('routesfound', function (e) {
      //               distance7 = e.routes[0].summary.totalDistance;
      //               time7 = e.routes[0].summary.totalTime;
              
      //   // med(distance80,distance17,distance7)


      //     if (distance80 < distance17) {
      //        if (distance80 < distance7) {
      //             console.log('mas cerca 80');
      //             // map.closePopup;
      //             map.removeControl(cll17);
      //             map.removeControl(sieteagosto)
                  

      //        }
      //        else{
      //             console.log('mas cerca 19');
      //             this.map.removeControl(ochenta);
      //             map.closePopup
      //           }
      //       }
               
      //             });
      //       });
      // });

        // function med(distance80,distance19,distance7){
        //   if (distance80 < distance17) {
        //      if (distance80 < distance7) {
        //           console.log('mas cerca 80');
        //           map.closePopup;
        //           map.removeControl(cll17);
        //           map.removeControl(sieteagosto)

        //           cll17.spliceWaypoints(0, 3);
        //           sieteagosto.spliceWaypoints(0, 3);
        //      }
        //      else{
        //           console.log('mas cerca 19');
        //           this.map.removeControl(ochenta);
        //           map.closePopup
        //         }
        //     }
                
        // }
};


      // var cu36 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.8204, -74.057) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cu36.hide();

      //  var cluster4 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.7939, -74.039425) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster4.hide();


      // var cluster8 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.767825, -74.0588) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster8.hide();


      // var cluster29 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.745206,-74.02983) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster29.hide();


      //  var cluster10 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.7564,-74.1005) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster10.hide();


      //  var cluster43 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.7356581,-74.08673) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster43.hide();

      // var cluster24 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.7240,-74.05353) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster24.hide();

      // var cluster14 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.69982,-74.03466) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster14.hide();

    
      // var cluster24_2 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.69656,-74.06206) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster24_2.hide();      


      // var cluster46 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.70917,-74.11068) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster46.hide();      

  

      // var cluster26 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.738461,-74.1214) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster26.hide();      


      // var cluster5 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.67466,-74.0229) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster5.hide();      



      // var cluster37 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.681608,-74.0821) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster37.hide();      




      // var cluster37 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.681608,-74.0821) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster37.hide();  


      // var cluster66 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.659554,-74.0638) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster66.hide();  


      // var cluster27 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.679411,-74.1412) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster27.hide();


      // var cluster3 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.6934,-74.166066) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster3.hide();

      //  var cu15 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.62809,-74.026) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cu15.hide();



      //  var cluster47 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.62857,-74.0749) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster47.hide();



      //  var cluster28 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.643142,-74.1075) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster28.hide();



      //  var cluster27_2 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.679411,-74.14124) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster27_2.hide();


      // var cluster3_2 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.693,-74.16606) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster3_2.hide();


      //   var cluster67 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.63435,-74.14028) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster67.hide();


      //  var cluster27_3 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.638592,-74.1820) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster27_3.hide();

      // var cluster17 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.5883,-74.0148) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster17.hide();

      // var cluster40 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.5938,-74.0434) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster40.hide();


      // var cluster150 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.5941,-74.0841) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster150.hide();


      // var cluster13 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.593,-74.1189) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster13.hide();

      //  var cluster111 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.6165,-74.18286) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster111.hide();


      // var cluster5_2 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.5558,-74.059) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster5_2.hide();


      // var cluster57 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.552849,-74.10210) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster57.hide();

      //  var cluster66 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.563507,-74.13914) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster66.hide();


      // var cluster6 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.5215,-74.0687) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster6.hide();

      //   var cluster20 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.5247,-74.1050) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster20.hide();

      //       var cluster12 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.539824,-74.14395) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster12.hide();


      //      var cluster9 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.501388,-74.09637) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster9.hide();


      //  var cluster19 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.507878,-74.11565) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster19.hide();



      //  var cluster3_3 = L.Routing.control(L.extend(window.lrmConfig, {
      //   waypoints: [
      //     L.latLng(latusuario,lonusuario),        //usuario
      //     L.latLng(coordsmoto[0], coordsmoto[1]),        //moto
      //     L.latLng(4.472566,-74.10196) //calle 19
      //   ],
      //   // geocoder: L.Control.Geocoder.nominatim(),  inicio y fin traducir direccion
      //   language: 'es', 
      //   routeWhileDragging: true,
      //   reverseWaypoints: true,
      //   showAlternatives: true,
      // })).addTo(map);

      // cluster3_3.hide();




//        control.on('routesfound', function (e) {
//         distance = e.routes[0].summary.totalDistance;
//         time = e.routes[0].summary.totalTime
//         // console.log("time",time/60 + " min");
//         // console.log("distancia",distance)
//      }); 
    
//         ochenta.on('routesfound', function (e) {
//         distance80 = e.routes[0].summary.totalDistance;
//         time80 = e.routes[0].summary.totalTime
//         // console.log("time80",time80/60 + " min");
//         // console.log("distancia80",distance80); 

//         cll17.on('routesfound', function (e) {
//         distance19 = e.routes[0].summary.totalDistance;
//         time19 = e.routes[0].summary.totalTime
//         // console.log("time19",time19/60 + " min");
//         // console.log("distancia19",distance19),

//         sieteagosto.on('routesfound', function (e) {
//         distance7 = e.routes[0].summary.totalDistance;
//         time7 = e.routes[0].summary.totalTime
        
//         med(distance80,distance19,distance7)
//       });
//       });
//       });

//         function med(distance80,distance19){
//           if (distance80 < distance19) {
//             console.log('mas cerca 80');
//             this.map.removeControl(cll17)


//           }
//           else{
//             console.log('mas cerca 19');
//             this.map.removeControl(ochenta)
//           }
//         }

// };









// L.Routing.errorControl(control).addTo(map);

// https://maps.google.com/?q=23.135249,-82.359685
// https://maps.google.com/?ll=23.135249,-82.359685&z=14  con zoom 14
// 
// 
// openstreetmap
// http://www.openstreetmap.org/?mlat=23&mlon=-82#map=18


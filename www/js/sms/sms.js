// Recepcion de sms

  document.addEventListener('deviceready', onDeviceReady.bind(this), false);

  onDeviceReady();

  function onDeviceReady() {
    // Handle the Cordova pause and resume events
    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);
    // Cordova has been loaded. Perform any initialization that requires Cordova here.
    

    /* Initialize sms-receive plugin */
    if(typeof (SMSReceive) === 'undefined') {
      // Error: plugin not installed
      console.warn('SMSReceive: plugin not present');
      console.log('Error: The plugin <strong>cordova-plugin-sms-receive</strong> is not present');
    } else {
      // Initialize incoming SMS event listener
      document.addEventListener('onSMSArrive', function(e) {
        console.log('onSMSArrive()');
        var IncomingSMS = e.data;
        console.log('sms.address:' + IncomingSMS.address);
        console.log('sms.body:' + IncomingSMS.body);

        // Debug received SMS contents as JSON

        // document.getElementById('event').innerHTML = 'SMS from: ' + IncomingSMS.address + '<br />Body: ' + IncomingSMS.body;
        alert("De: " + IncomingSMS.address + '<br/> cuerpo: '+ IncomingSMS.body);

        var de = IncomingSMS.address;
        var cuerpo = IncomingSMS.body;

        if (de = '3142158584') {

             if (cuerpo.indexOf("sensor alarm!")){
               // alert('alarma activada');

                var inlat = (cuerpo.indexOf("lat:"));
                var inlon = (cuerpo.indexOf("long:"));

                // document.write(inlat);

                var lati = (inlat + 4);
                var longi = (inlon + 5);

                lat = cuerpo.substring(lati, lati + 7);
                lon = cuerpo.substring(longi, longi + 9);

                alert('lat: ' + lat + '<br/>lon: ' + lon);

                geomoto(coordsmoto);

                    function geomoto(variable){
                          variable[0] = lat;
                          variable[1] = lon
                    };

                      if (coordsmoto[0] != "undefined") {
                      geousuario(lat, lon);
                    }

                SelectPoints(lat,lon);

             }

             else {

                var inlat = (cuerpo.indexOf("lat:"));
                var inlon = (cuerpo.indexOf("long:"));

                // document.write(inlat);

                var lati = (inlat + 4);
                var longi = (inlon + 5);

                lat = cuerpo.substring(lati, lati + 7);
                lon = cuerpo.substring(longi, longi + 9);

                geomoto(lat,lon);
                SelectPoints(lat,lon);

             }
       }

       else {
          console.log('Numero invalido')
        };
      });

        SMSReceive.startWatch(function() {
          console.log('SMS Watching started');
          var star = document.getElementById("start");
           star.className = "show";
            setTimeout(function(){ star.className = star.className.replace("show", ""); }, 3000);

        }, 

        function() {
          console.log('Plugin failed to start watching');
        }
        );

    }
    };

  function onPause() {
    // TODO: This application has been suspended. Save application state here.
  };

  function onResume() {
    // TODO: This application has been reactivated. Restore application state here.
  };


// enviar sms

var sendto = '3142158584';
var textmsg = 'fix030s001n949603';  //mensaje ubicacion actual


function onLoad() {
            if(( /(ipad|iphone|ipod|android)/i.test(navigator.userAgent) )) {
                document.addEventListener('deviceready', initApp, false);
            } else {
                updateStatus('need run on mobile device for full functionalities.');
            }
        }

        // we will restore the intercepted SMS here, for later restore
        var smsList = [];
        var interceptEnabled = false;

        function initApp() {
          if (! SMS ) { alert( 'SMS plugin not ready' ); return; }
          
            document.addEventListener('onSMSArrive', function(e){
              var data = e.data;
              smsList.push( data );
              
              updateStatus('SMS arrived, count: ' + smsList.length );
              
              var divdata = $('div#data');
              divdata.html( divdata.html() + JSON.stringify( data ) );
              
            });
        }
        
        function update( id, str ) {
          $('div#' + id).html( str );
        }
        function updateStatus( str ) {
          $('div#status').html( str );
        }
        function updateData( str ) {
          $('div#data').html( str );
        }
        
        function sendSMS() {
          // var sendto = $('input#sendto').val().trim();
          // var textmsg = $('textarea#textmsg').val();
          alert('mensaje enviado');

          if(sendto.indexOf(";") >=0) {
            sendto = sendto.split(";");
            for(i in sendto) {
              sendto[i] = sendto[i].trim();
            }
          }
          if(SMS) SMS.sendSMS(sendto, textmsg, function(){}, function(str){alert(str);});
        }
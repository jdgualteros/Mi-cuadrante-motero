getPosition();

var coordsmoto = ["undefined","undefined"]
 
window.lrmConfig = {
//    serviceUrl: 'https://api.mapbox.com/directions/v5',
//    profile: 'mapbox/driving',
};

///////////////////////// CREACION DE MAPA ////////////////////7
//monstrar solo el mapa de colombia

var occidente = L.latLng(4.9541,-74.3321),
    oriente = L.latLng(4.3670,-73.8844),
    bounds = L.latLngBounds(occidente, oriente);

var map = L.map('map', {
    maxBounds: bounds  // Then add it here..
}).fitWorld();

map.setView([4.751, -74.11], 10.4)

var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  minZoom: 10.4,
  useCache: true
}).addTo(map);

function onEachFeature(feature, layer) {

    layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight
    // click: zoomToFeature
   
  });
}

 geojson = L.geoJson(cuadrantes,{
    onEachFeature: onEachFeature,
    fillOpacity: 0,
    "color": "#33831E",
    "weight": 2
  }).addTo(map); 

/////////////////

 var usuario;

  function geo(Lat,Lon){

    console.log(Lat,Lon);

    if (Lat != undefined){
        var myPolyLayer = L.geoJSON();
        myPolyLayer.addData(cuadrantes);

        map.setView([Lat,Lon],15);

    if (usuario != undefined) {
            map.removeLayer(usuario);
      };

      usuario = L.marker([Lat, Lon]).addTo(map);

      geojson.eachLayer(function(layer) {

          var tel = layer.feature.properties.PCUTELEFON;
          var cua = layer.feature.properties.PCUDESCRIP;

        var ptsWithin4 = turf.within(usuario.toGeoJSON(), layer.toGeoJSON());
        if (ptsWithin4.features.length > 0) {
            console.log(cua,tel);
              usuario.bindPopup("Usted esta Aqui!" + '<br/>' + cua + '<br/>' + tel).openPopup()
          }
    });
  };
}

  // control that shows state info on hover
  var info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  //Ventana emergente con informacion del cuadrante
  info.update = function (props) {
    this._div.innerHTML = (props ?
      '<b>' + props.PCUDESCRIP + '</b><br>' + 'Estación: '+ props.PCUNOMEST + '</b><br>' + 'CAI:' + props.PCUNOMCAI + '</b><br>' + 'Telefono: ' + props.PCUTELEFON
      : 'Mi cuadrante motero');
  };
  info.addTo(map);

//cambiar el color al oprimir el cuadrante
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }

    info.update(layer.feature.properties);
    }

    var geojson;

    function resetHighlight(e) {
      geojson.resetStyle(e.target);
      info.update();
    }

  // function zoomToFeature(e) {
  //   map.fitBounds(e.target.getBounds());
  // }


//===================================== Ubicacion ================================================== 

    var miubicacion = document.getElementById("getPosition");
    miubicacion.addEventListener("click",getPosition);

          function getPosition() {
            var options = {
              //un gps
               enableHighAccuracy: true,
               maximumAge: 5600000
              //  maximumAge: 3600000,
              // timeout: 4000,
              // enableHighAccuracy: true,
            }
            var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
            // var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

            function onSuccess(position){
              var lat = position.coords.latitude;
              var lon = position.coords.longitude;
              geo(lat,lon);

              // prueba de seleccion de puntos original se encuentra en sms.js
              SelectPoints(lat,lon);
              geomoto(coordsmoto);

                    function geomoto(variable){
                          variable[0] = 4.7499727;
                          variable[1] = -74.114
                    };

                      if (coordsmoto[0] != "undefined") {
                      geousuario(lat, lon);
                    }
                }
            };

            function onError(error) {
              alert('code: '    + error.code    + '\n' + 'Error de geolocalización: ' + error.message + '\n');
              var lat = 'indefinido';
              var lon = 'indefinido';
              geo(lat.lon)
              // console.log(lat,lon)
              };
 
// Listen to cache hits and misses and spam the console
// The cache hits and misses are only from this layer, not from the WMS layer.
layer.on('tilecachehit', function(ev) {
  console.log('Cache hit: ', ev.url);
});
layer.on('tilecachemiss', function(ev) {
  console.log('Cache miss: ', ev.url);
});

layer.addTo(map);

// L.TileLayer.PouchDBCached
L.TileLayer.addInitHook(function() {
  if (!this.options.useCache) {
    this._db = null;
    this._canvas = null;
    return;
  }

  this._db = new PouchDB('offline-tiles');
  this._canvas = document.createElement('canvas');

  if (!(this._canvas.getContext && this._canvas.getContext('2d'))) {
    // HTML5 canvas is needed to pack the tiles as base64 data. If
    // the browser doesn't support canvas, the code will forcefully
    // skip caching the tiles.
    this._canvas = null;
  }
});

L.TileLayer.prototype.options.useCache = false;
L.TileLayer.prototype.options.saveToCache = true;
L.TileLayer.prototype.options.useOnlyCache = false;
L.TileLayer.prototype.options.cacheFormat = 'image/png';
L.TileLayer.prototype.options.cacheMaxAge = 24 * 3600 * 1000;

L.TileLayer.include({
  // Overwrites L.TileLayer.prototype.createTile
  createTile: function(coords, done) {
    var tile = document.createElement('img');

    tile.onerror = L.bind(this._tileOnError, this, done, tile);

    if (this.options.crossOrigin) {
      tile.crossOrigin = '';
    }

    /*
     Alt tag is *set to empty string to keep screen readers from reading URL and for compliance reasons
     http://www.w3.org/TR/WCAG20-TECHS/H67
     */
    tile.alt = '';

    var tileUrl = this.getTileUrl(coords);

    if (this.options.useCache && this._canvas) {
      this._db.get(tileUrl, {
        revs_info: true
      }, this._onCacheLookup(tile, tileUrl, done));
    } else {
      // Fall back to standard behaviour
      tile.onload = L.bind(this._tileOnLoad, this, done, tile);
    }

    tile.src = tileUrl;
    return tile;
  },

  // Returns a callback (closure over tile/key/originalSrc) to be run when the DB
  // backend is finished with a fetch operation.
  _onCacheLookup: function(tile, tileUrl, done) {
    return function(err, data) {
      if (data) {
        this.fire('tilecachehit', {
          tile: tile,
          url: tileUrl
        });
        if (Date.now() > data.timestamp + this.options.cacheMaxAge && !this.options.useOnlyCache) {
          // Tile is too old, try to refresh it
          // console.log('Tile is too old: ', tileUrl);

          if (this.options.saveToCache) {
            tile.onload = L.bind(this._saveTile, this, tile, tileUrl, data._revs_info[0].rev, done);
          }
          tile.crossOrigin = 'Anonymous';
          tile.src = tileUrl;
          tile.onerror = function(ev) {
            // If the tile is too old but couldn't be fetched from the network,
            // serve the one still in cache.
            this.src = data.dataUrl;
          }
        } else {
          // Serve tile from cached data
          // console.log('Tile is cached: ', tileUrl);
          tile.onload = L.bind(this._tileOnLoad, this, done, tile);
          tile.src = data.dataUrl; // data.dataUrl is already a base64-encoded PNG image.
        }
      } else {
        this.fire('tilecachemiss', {
          tile: tile,
          url: tileUrl
        });
        if (this.options.useOnlyCache) {
          // Offline, not cached
          // console.log('Tile not in cache', tileUrl);
          tile.onload = L.Util.falseFn;
          tile.src = L.Util.emptyImageUrl;
        } else {
          // Online, not cached, request the tile normally
          // console.log('Requesting tile normally', tileUrl);
          if (this.options.saveToCache) {
            tile.onload = L.bind(this._saveTile, this, tile, tileUrl, null, done);
          } else {
            tile.onload = L.bind(this._tileOnLoad, this, done, tile);
          }
          tile.crossOrigin = 'Anonymous';
          tile.src = tileUrl;
        }
      }
    }.bind(this);
  },

  // Returns an event handler (closure over DB key), which runs
  // when the tile (which is an <img>) is ready.
  // The handler will delete the document from pouchDB if an existing revision is passed.
  // This will keep just the latest valid copy of the image in the cache.
  _saveTile: function(tile, tileUrl, existingRevision, done) {
    if (this._canvas === null) return;
    this._canvas.width = tile.naturalWidth || tile.width;
    this._canvas.height = tile.naturalHeight || tile.height;

    var context = this._canvas.getContext('2d');
    context.drawImage(tile, 0, 0);

    var dataUrl = this._canvas.toDataURL(this.options.cacheFormat);
    var doc = {
      dataUrl: dataUrl,
      timestamp: Date.now()
    };

    if (existingRevision) {
      this._db.remove(tileUrl, existingRevision);
    }
    this._db.put(doc, tileUrl, doc.timestamp);

    if (done) {
      done();
    }
  },

  // Seeds the cache given a bounding box (latLngBounds), and
  // the minimum and maximum zoom levels
  // Use with care! This can spawn thousands of requests and
  // flood tileservers!
  seed: function(bbox, minZoom, maxZoom) {
    if (!this.options.useCache) return;
    if (minZoom > maxZoom) return;
    if (!this._map) return;

    var queue = [];

    for (var z = minZoom; z <= maxZoom; z++) {

      var northEastPoint = this._map.project(bbox.getNorthEast(), z);
      var southWestPoint = this._map.project(bbox.getSouthWest(), z);

      // Calculate tile indexes as per L.TileLayer._update and
      // L.TileLayer._addTilesFromCenterOut
      var tileSize = this.getTileSize();
      var tileBounds = L.bounds(
        L.point(Math.floor(northEastPoint.x / tileSize.x), Math.floor(northEastPoint.y / tileSize.y)),
        L.point(Math.floor(southWestPoint.x / tileSize.x), Math.floor(southWestPoint.y / tileSize.y)));

      for (var j = tileBounds.min.y; j <= tileBounds.max.y; j++) {
        for (var i = tileBounds.min.x; i <= tileBounds.max.x; i++) {
          point = new L.Point(i, j);
          point.z = z;
          queue.push(this._getTileUrl(point));
        }
      }
    }

    var seedData = {
      bbox: bbox,
      minZoom: minZoom,
      maxZoom: maxZoom,
      queueLength: queue.length
    }
    this.fire('seedstart', seedData);
    var tile = this._createTile();
    tile._layer = this;
    this._seedOneTile(tile, queue, seedData);
  },

  _createTile: function() {
    return document.createElement('img');
  },

  // Modified L.TileLayer.getTileUrl, this will use the zoom given by the parameter coords
  // instead of the maps current zoomlevel.
  _getTileUrl: function(coords) {
    var zoom = coords.z;
    if (this.options.zoomReverse) {
      zoom = this.options.maxZoom - zoom;
    }
    zoom += this.options.zoomOffset;
    return L.Util.template(this._url, L.extend({
      r: this.options.detectRetina && L.Browser.retina && this.options.maxZoom > 0 ? '@2x' : '',
      s: this._getSubdomain(coords),
      x: coords.x,
      y: this.options.tms ? this._globalTileRange.max.y - coords.y : coords.y,
      z: this.options.maxNativeZoom ? Math.min(zoom, this.options.maxNativeZoom) : zoom
    }, this.options));
  },

  // Uses a defined tile to eat through one item in the queue and
  // asynchronously recursively call itself when the tile has
  // finished loading.
  _seedOneTile: function(tile, remaining, seedData) {
    if (!remaining.length) {
      this.fire('seedend', seedData);
      return;
    }
    this.fire('seedprogress', {
      bbox: seedData.bbox,
      minZoom: seedData.minZoom,
      maxZoom: seedData.maxZoom,
      queueLength: seedData.queueLength,
      remainingLength: remaining.length
    });

    var url = remaining.pop();

    this._db.get(url, function(err, data) {
      if (!data) {
        /// FIXME: Do something on tile error!!
        tile.onload = function(ev) {
          this._saveTile(tile, url, null); //(ev)
          this._seedOneTile(tile, remaining, seedData);
        }.bind(this);
        tile.crossOrigin = 'Anonymous';
        tile.src = url;
      } else {
        this._seedOneTile(tile, remaining, seedData);
      }
    }.bind(this));
  }
});
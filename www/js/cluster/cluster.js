var markers = L.markerClusterGroup();

	var geoJsonLayer = L.geoJson(geoJsonData, {
		onEachFeature: function (feature, layer) {
			layer.bindPopup(feature.properties.PCUDESCRIP);
		}
	});
	markers.addLayer(geoJsonLayer);

	map.addLayer(markers);
	// map.fitBounds(markers.getBounds());

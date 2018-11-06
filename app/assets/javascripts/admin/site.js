document.addEventListener("turbolinks:load", function() {

	var app = document.getElementById('app');

	const initAutocompleteMap=()=>{
	function initMap() {
		let storedLat = document.getElementById('place_lat').value;
		let storedLng = document.getElementById('place_lng').value;
		function currentLatStart(){ if(storedLat == 0) {return 51.22} else {return storedLat} };
		function currentLngStart(){ if(storedLng == 0) {return 6.78} else {return storedLng} };

	  var map = new google.maps.Map(document.getElementById('map'), {
	    center: { lat: Number(currentLatStart()), lng: Number(currentLngStart()) },
	    zoom: 17
	  });
	  var card = document.getElementById('pac-card');
	  var input = document.getElementById('pac-input');
	  var types = document.getElementById('type-selector');
	  var strictBounds = document.getElementById('strict-bounds-selector');

	  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

	  var autocomplete = new google.maps.places.Autocomplete(input);

	  // Bind the map's bounds (viewport) property to the autocomplete object,
	  // so that the autocomplete requests use the current map bounds for the
	  // bounds option in the request.
	  autocomplete.bindTo('bounds', map);

	  // Set the data fields to return when the user selects a place.
	  autocomplete.setFields(
	      ['address_components', 'geometry', 'icon', 'name']);

	  var infowindow = new google.maps.InfoWindow();
	  var infowindowContent = document.getElementById('infowindow-content');
	  infowindow.setContent(infowindowContent);
	  var marker = new google.maps.Marker({
	    map: map,
	    anchorPoint: new google.maps.Point(0, -29)
	  });

	  autocomplete.addListener('place_changed', function() {
	    infowindow.close();
	    marker.setVisible(false);
	    var place = autocomplete.getPlace();

	    var lat = place.geometry.location.lat(),
	      lng = place.geometry.location.lng();
	  // Then do whatever you want with the
	  document.getElementById('place_lat').value=lat;
	  document.getElementById('place_lng').value=lng;

	  console.log(lat);
	  console.log(lng);

	    if (!place.geometry) {
	      // User entered the name of a Place that was not suggested and
	      // pressed the Enter key, or the Place Details request failed.
	      window.alert("No details available for input: '" + place.name + "'");
	      return;
	    }

	    // If the place has a geometry, then present it on a map.
	    if (place.geometry.viewport) {
	      map.fitBounds(place.geometry.viewport);
	    } else {
	      map.setCenter(place.geometry.location);
	      map.setZoom(17);  // Why 17? Because it looks good.
	    }
	    marker.setPosition(place.geometry.location);
	    marker.setVisible(true);

	    var address = '';
	    if (place.address_components) {
	      address = [
	        (place.address_components[0] && place.address_components[0].short_name || ''),
	        (place.address_components[1] && place.address_components[1].short_name || ''),
	        (place.address_components[2] && place.address_components[2].short_name || '')
	      ].join(' ');
	    }

	    infowindowContent.children['place-icon'].src = place.icon;
	    infowindowContent.children['place-name'].textContent = place.name;
	    infowindowContent.children['place-address'].textContent = address;
	    infowindow.open(map, marker);
	  });

	  // Sets a listener on a radio button to change the filter type on Places
	  // Autocomplete.
	  function setupClickListener(id, types) {
	    var radioButton = document.getElementById(id);
	    radioButton.addEventListener('click', function() {
	      autocomplete.setTypes(types);
	    });
	  }

	  setupClickListener('changetype-all', []);
	  setupClickListener('changetype-address', ['address']);
	  setupClickListener('changetype-establishment', ['establishment']);
	  setupClickListener('changetype-geocode', ['geocode']);

	  document.getElementById('use-strict-bounds')
	      .addEventListener('click', function() {
	        console.log('Checkbox clicked! New state=' + this.checked);
	        autocomplete.setOptions({strictBounds: this.checked});
	      });
	}
	initMap()
	};

	////////////////////////////////////////////////////////////////////////////////////////

	const initShowMap=()=>{
	var placeLat = document.getElementById('map').dataset.placeLat,
			placeLng = document.getElementById('map').dataset.placeLng,
			placeName = document.getElementById('map').dataset.placeName;

	function initMap() {
		
        var place = new google.maps.LatLng(placeLat, placeLng);

        var map = new google.maps.Map(document.getElementById('map'), {
          center: place,
          zoom: 17
        });

        var coordInfoWindow = new google.maps.InfoWindow();
        coordInfoWindow.setContent(createInfoWindowContent(place, map.getZoom()));
        coordInfoWindow.setPosition(place);
        coordInfoWindow.open(map);

        map.addListener('zoom_changed', function() {
          coordInfoWindow.setContent(createInfoWindowContent(place, map.getZoom()));
          coordInfoWindow.open(map);
        });
      }

      var TILE_SIZE = 256;

      function createInfoWindowContent(latLng, zoom) {
        var scale = 1 << zoom;

        var worldCoordinate = project(latLng);

        var pixelCoordinate = new google.maps.Point(
            Math.floor(worldCoordinate.x * scale),
            Math.floor(worldCoordinate.y * scale));

        var tileCoordinate = new google.maps.Point(
            Math.floor(worldCoordinate.x * scale / TILE_SIZE),
            Math.floor(worldCoordinate.y * scale / TILE_SIZE));

        return [
          `<p class="text-uppercase m-0">${placeName}</p>`
        ].join('<br>');
      }

      // The mapping between latitude, longitude and pixels is defined by the web
      // mercator projection.
      function project(latLng) {
        var siny = Math.sin(latLng.lat() * Math.PI / 180);

        // Truncating to 0.9999 effectively limits latitude to 89.189. This is
        // about a third of a tile past the edge of the world tile.
        siny = Math.min(Math.max(siny, -0.9999), 0.9999);

        return new google.maps.Point(
            TILE_SIZE * (0.5 + latLng.lng() / 360),
            TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)));
      }

      initMap()
      };

      ////////////////////////////////////////////////////////////////////////

	if (app.dataset.controller == 'ttdays' && app.dataset.action == 'show'){
		function showLessonModal(){
			$('body').on('click', '.lessonModalButton', function(){
				$('#lessonModal').modal('show');
			});
			$('#lessonModal').on('hidden.bs.modal', function (e) {
				$('#lessonModalContent').html("LOADING...");
			})
		};
		showLessonModal();
	}

	if (app.dataset.controller == 'lessons' && app.dataset.action == 'new'){
		
		initAutocompleteMap();
	}

	if (app.dataset.controller == 'lessons' && app.dataset.action == 'edit'){
		
		initAutocompleteMap();
	}

	if (app.dataset.controller == 'lessons' && app.dataset.action == 'show'){
		
		initShowMap();
	}

});

document.addEventListener("turbolinks:before-cache", function() {

});


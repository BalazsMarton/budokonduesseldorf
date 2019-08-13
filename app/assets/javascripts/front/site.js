document.addEventListener("turbolinks:load", function() {

	if(window.matchMedia('(max-width: 767px)').matches) {
		var bg = jQuery(".hero");
		bg.height(jQuery(window).height());
	};

	// Initialize the media query
	var mediaQuery = window.matchMedia('(min-width: 1280px)');
	// Add a listen event
	mediaQuery.addListener(reponsiveParallax);

	// Function to do something with the media query
	function reponsiveParallax(mediaQuery) {    
	if (mediaQuery.matches) {
		$('.parallax-section').attr("data-stellar-background-ratio", "0.5");
		$('.parallax-section').removeClass('bg-center');
	} else {
		$('.parallax-section').removeAttr("data-stellar-background-ratio");
		$('.parallax-section').addClass('bg-center');	    }
	}

	// On load
	reponsiveParallax(mediaQuery);

	$.stellar({
		horizontalScrolling: false,
		//scrollProperty: 'transform',
		responsive: true,
		hideDistantElements: false,
	});

	$('.service-tab').hover(
		function(){
		$(this).find(".service-tab-caption").addClass('cshow') 
		$(this).find(".service-tab-background-caption").addClass('chide')
		},
		function(){ 
		$(this).find(".service-tab-caption").removeClass('cshow')
		$(this).find(".service-tab-background-caption").removeClass('chide') 
		}
	);

	

	////////////////////////////////////////////////////////////////////////////////////////

	function initShowMap(){
	var placeLat = document.getElementById('map').dataset.placeLat;
	var placeLng = document.getElementById('map').dataset.placeLng;
	var placeName = document.getElementById('map').dataset.placeName;

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
          '<p class="text-uppercase m-0 color-gold">'+placeName+'</p>'
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
    const app = document.getElementById('app');

	if (app.dataset.controller == 'pages' && app.dataset.action == 'workshop'){
		if (document.getElementById('map')){
			initShowMap();
		}
	}

	if (app.dataset.controller == 'pages' && app.dataset.action == 'home'){
		
		$('#carouselCustomerReviews').carousel({
		interval: 15000,
		pause: 'hover',
		});

	}

	if (app.dataset.controller == 'pages' && app.dataset.action == 'budokon'){
		
		function showBudokonModal(){
			$('body').on('click', '.budokonModalButton', function(){
				$('#budokonModal').modal('show');
			});
			$('#budokonModal').on('hidden.bs.modal', function (e) {
				$('#budkoncardModal').html("LOADING...");
			})
		};

		showBudokonModal();
		
	}

	if (app.dataset.controller == 'pages' && app.dataset.action == 'classes'){
		
		$('.classesCollapseButton').on('click', function (event) {
			$('.collapse-example-wrap').remove()
			$('.close').remove()
			$('.classesCollapseButton').removeClass('chide')

			$(this).addClass("chide")
			$(this).after('<i class="close fa fa-times" aria-hidden="true"></i>')
			$(this).parents('.lesson-box').after('<div class="col-sm-12 col-md-12 col-lg-12 collapse-example-wrap" id=""><div class="collapse" id="collapseExample"><div class="card card-body">LOADING...</div></div></div>')

			$("#collapseExample").collapse('show');

		});
		
	}

});

document.addEventListener("turbolinks:before-cache", function() {

	const app = document.getElementById('app');

	//remove service hover before navigate
	$(".service-tab-caption").removeClass('cshow')
	$(".service-tab-background-caption").removeClass('chide')
	
	//remove parallax effect before navigate
	$.stellar('destroy')

	if (app.dataset.controller == 'pages' && app.dataset.action == 'classes'){
		
		$('.collapse-example-wrap').remove()
		$('.chide').removeClass('chide')
		$('.close').remove()
	}

	

});
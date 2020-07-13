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

				$.get('https://www.instagram.com/attilapt/?__a=1', function(data) {
					const edges = data.graphql.user.edge_owner_to_timeline_media.edges;
					for(let i = 0; i < edges.length; i++) {
						$(".insta-carousel").append('<div class="item"><a class="insta-modal-link" data-shortcode="'+data.graphql.user.edge_owner_to_timeline_media.edges[i].node.shortcode+'" data-toggle="modal" data-target="#instaModal"><img src="'+data.graphql.user.edge_owner_to_timeline_media.edges[i].node.thumbnail_resources[2].src+'"></a></div>');
					}
					initInstaCarousel()
				})
				function initInstaCarousel(){
					let owl = $('.insta-carousel');

					owl.owlCarousel({
						loop:true,
						autoplay:true,
						autoplayTimeout:5000,
						autoplayHoverPause:true,
						responsive:{
							0:{
									items:3,
							},
							576:{
									items:6,
							},
						}
					});
					CarouselWheelFeature(owl)

				}
				
				$('body').on('click', '.insta-modal-link', function(){
					let instaShortcode = this.dataset.shortcode
					$('#instaModal .modal-body').html(`
					<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/${instaShortcode}/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="12" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
				<div style="padding:16px;">
					<a href="https://www.instagram.com/p/${instaShortcode}/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank">
						<div style=" display: flex; flex-direction: row; align-items: center;">
							<div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;">
								<div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div>
								<div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div>
							</div>
						</div>
						<div style="padding: 19% 0;"></div>
						<div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
							<svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg>
						</div>
						<div style="padding-top: 8px;">
							<div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"> A bejegyzés megtekintése az Instagramon</div>
						</div>
						<div style="padding: 12.5% 0;"></div>
						<div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;">
							<div>
								<div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div>
								<div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div>
								<div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div>
							</div>
							<div style="margin-left: 8px;">
								<div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div>
								<div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div>
							</div>
							<div style="margin-left: auto;">
								<div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div>
								<div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div>
								<div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div>
							</div>
						</div>
					</a>
					<p style=" margin:8px 0 0 0; padding:0 4px;">
						<a href="https://www.instagram.com/p/${instaShortcode}/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">ʙᴇ ᴘʀᴏᴜᴅ ᴏғ ʏᴏᴜʀsᴇʟғ.⁣ ————————————⁣ Do one thing today to make you feel proud of yourself. Just one thing! You do it because making yourself proud is one of the best feelings in the world.⁣ ⁣ When I see this picture, I still get filled with immense pride. I never imagined I’d be the guy doing these things!⁣ ⁣ I am grateful for what I have accomplished in my life and I plan to stay that way. I’ll never take this for granted nor the journey that got me here or not the journey that will get me further.⁣ ⁣ Let every accomplishment (even the small ones) fill you with pride. Then cling to that feeling and don’t let it fade. Build upon it and GROW.⁣ 📸 @le.aiken</a>
					</p>
					<p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">
						<a href="https://www.instagram.com/attilapt/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank"> ATTILA MIXED MOVEMENT ATHLETE</a> (@attilapt) által megosztott bejegyzés, <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="2020-04-29T08:48:52+00:00">Ápr 29., 2020, időpont: 1:48 (PDT időzóna szerint)</time>
					</p>
				</div>
			</blockquote>
			
					`);
					window.instgrm.Embeds.process()
				});
				$('#instaModal').on('hidden.bs.modal', function (e) {
					$('#instaModal .modal-body').html(``);
				});

				(function initSponsorsCarousel(){
					let owl = $('.sponsors-carousel')
					owl.owlCarousel({
						loop:true,
						autoplay:true,
						autoplayTimeout:5000,
						autoplayHoverPause:true,
						dots: false,
						nav:true,
						navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
					});
					CarouselWheelFeature(owl)
				})();

				(function initEventsAddCarousel(){
					let owl = $('.events-add-carousel')
					owl.owlCarousel({
						loop:false,
						autoplay:true,
						autoplayTimeout:5000,
						autoplayHoverPause:true,
						dots: false,
						nav:true,
						navText : ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
						responsive:{
							0:{
									items:1,
							},
							576:{
									items:3,
							},
						}
					});
					CarouselWheelFeature(owl)
				})();
			
				
				function CarouselWheelFeature(actualCarousel){
					actualCarousel.on('mousewheel', '.owl-stage', function (e) {
						if (e.deltaY>0) {
							actualCarousel.trigger('next.owl');
						} else {
							actualCarousel.trigger('prev.owl');
						}
						e.preventDefault();
					});					
				}

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
	if (app.dataset.controller == 'pages' && app.dataset.action == 'booking'){
	}

});

document.addEventListener("turbolinks:before-cache", function() {

	const app = document.getElementById('app');

	//remove service hover before navigate
	$(".service-tab-caption").removeClass('cshow')
	$(".service-tab-background-caption").removeClass('chide')
	
	//remove parallax effect before navigate
	$.stellar('destroy')

	//owl carousel destroy
	$('.owl-carousel').owlCarousel('destroy'); 

	if (app.dataset.controller == 'pages' && app.dataset.action == 'classes'){
		
		$('.collapse-example-wrap').remove()
		$('.chide').removeClass('chide')
		$('.close').remove()
	}

	if (app.dataset.controller == 'pages' && app.dataset.action == 'booking'){

	}


});

(function () {
  var each = Array.prototype.forEach
  var autoplayIds = []

  document.addEventListener('turbolinks:before-cache', function () {
    var autoplayElements = document.querySelectorAll('[autoplay]')
		each.call(autoplayElements, function (element) {
      if (!element.id) throw 'autoplay elements need an ID attribute'
      autoplayIds.push(element.id)
      element.removeAttribute('autoplay')
    })
  })

  document.addEventListener('turbolinks:before-render', function (event) {
    autoplayIds = autoplayIds.reduce(function (ids, id) {
      var autoplay = event.data.newBody.querySelector('#' + id)
      if (autoplay) autoplay.setAttribute('autoplay', true)
      else ids.push(id)
      return ids
    }, [])
  })
})()
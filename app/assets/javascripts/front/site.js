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

	$('#carouselCustomerReviews').carousel({
		interval: 15000,
		pause: 'hover',
	});

	function showBudokonModal(){
	$('body').on('click', '.budokonModalButton', function(){
		$('#budokonModal').modal('show');
	});
	$('#budokonModal').on('hidden.bs.modal', function (e) {
		$('#budkoncardModal').html("LOADING...");
	})
	};

	showBudokonModal();

	$('.classesCollapseButton').click(
		function(){

		$('.collapse-example-wrap').remove()
		$('.close').remove()
		$('.classesCollapseButton').removeClass('chide')

		$(this).addClass("chide")
		$(this).after(`<i class="close fa fa-times" aria-hidden="true"></i>`)
		$(this).parents('.lesson-box').after(`
			<div class="col-sm-12 col-md-12 col-lg-12 collapse-example-wrap" id="">
				<div class="collapse" id="collapseExample">
				  <div class="card card-body">
				    LOADING...
				  </div>
				</div>
			</div>
		`)

		$("#collapseExample").collapse('show');

		},
	);

});

document.addEventListener("turbolinks:before-cache", function() {

	//remove service hover before navigate
	$(".service-tab-caption").removeClass('cshow')
	$(".service-tab-background-caption").removeClass('chide')
	
	//remove parallax effect before navigate
	$.stellar('destroy')

});
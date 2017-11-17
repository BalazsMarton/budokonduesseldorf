document.addEventListener("turbolinks:load", function() {

	/*navwrapheight = $('.navbar').outerHeight();
	$('.navbar-wrap').height(navwrapheight);*/

	//jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
	    if ($(".navbar").offset().top > 100) {
	        $(".navbar").addClass("top-nav-collapse");
	    } else {
	        $(".navbar").removeClass("top-nav-collapse");
	    }
	});

});

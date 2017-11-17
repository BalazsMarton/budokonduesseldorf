document.addEventListener("turbolinks:load", function() {
	$('.social-icons a').hover(
       function(){ $(this).addClass('animated jello') },
       function(){ $(this).removeClass('animated jello') }
	)
});

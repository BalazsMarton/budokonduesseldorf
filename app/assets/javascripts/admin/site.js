document.addEventListener("turbolinks:load", function() {

	function showLessonModal(){
		$('body').on('click', '.lessonModalButton', function(){
			$('#lessonModal').modal('show');
		});
		$('#lessonModal').on('hidden.bs.modal', function (e) {
			$('#lessonModalContent').html("LOADING...");
		})
	};

	showLessonModal();


});

document.addEventListener("turbolinks:before-cache", function() {

});
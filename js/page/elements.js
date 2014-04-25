/*global $:false*/
var $slides = $('.slides');

var Elements = {
	
	start: function() {
		
		Elements.slides();
		Elements.skillBars();
		Elements.faq();
		
	},
	
	slides: function() {
		
		$slides.slidesjs();
		
	},
	
	skillBars: function() {
		
		$('#skills .bar').each(function(index) {
			$(this).append('<span></span>').find('span').delay((index + 1) * 300).animate({'width': $(this).data('width') + '%'}, 600);
		});
		
	},
	
	faq: function() {
		
		$('.faq .faq-title').bind('click', function() {
			var $faq = $(this).closest('.faq'),
			$faqBox = $faq.find('.faq-box'),
			$faqIcon = $faq.find('.faq-title .fa');
			
			$faqBox.toggleClass('open');
			$faqIcon.toggleClass("fa-plus fa-minus");
		});
		
	}
};
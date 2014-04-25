/*global $:false*/
var $window = $(window);

var Portfolio = {
	
	start: function() {
		Portfolio.onResize();
		Portfolio.isotope();
		Portfolio.isotopeFilter();
		Portfolio.bind();
	},
	
	bind: function() {
		
		$('#filter a').bind('click', function(e) {
			e.preventDefault();
			$('#isotope').isotope({
				filter: $(this).attr('data-filter')
			});
		});
		
	},
	
	onResize: function() {
		
		$window.resize(function() { 
			
			Portfolio.isotope();
			
		});
		
	},
	
	isotopeFilter: function() {
		
		$('#filter li:first a').addClass('active');
		
		$('#filter li a').bind('click', function() {
			$('#filter a').removeClass('active');
			$(this).addClass('active');
		});
		
	},
	
	isotope: function() {
		
		var ww = $('.isotope-holder').outerWidth(),
		col_width = 0,
		$isotopeElement = $('#isotope .element'),
		$isotopeHeight = $('#isotope .element.height'),
		$isotopeWidth = $('#isotope .element.width');
		
		switch(true) {
			case (ww <= 360):
				col_width = Math.round(ww); break;
			case ((ww > 360 && ww <= 700)):
				col_width = Math.round(ww / 2); break;
			case (ww > 700 && ww <= 1090):
				col_width = Math.round(ww / 3); break;
			case (ww >= 1090 && ww <= 1399):
				col_width = Math.round(ww / 4); break;
			default:
				col_width = Math.round(ww / 6);
		}
		
		col_width = (col_width < 320 && ww < 360) ? 320 : col_width;
		
		$isotopeElement.width(col_width + 1).height(Math.round(col_width - (col_width * 0.15)));
		$isotopeHeight.height(Math.round($isotopeElement.height()*2));
		$isotopeWidth.width(col_width * 2 + 2);
		
		$('#isotope').width('101%')
		.isotope({columnWidth: col_width},{itemSelector: '.element'});
	}
};
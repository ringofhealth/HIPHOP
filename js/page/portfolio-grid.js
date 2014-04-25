/*global $:false, backgroundResize*/
var $window = $(window);

var Portfolio = {
	
	start: function() {
		
		Portfolio.onResize();
		
		Portfolio.onLoad();
		
		Portfolio.bind();
		
		Portfolio.gallery();
		
		Portfolio.isotopeFilter();
		
	},
	
	onLoad: function() {
		
		$(window).load(function() {
			
			Portfolio.isotope();
			
		});
		
	},
	
	onResize: function() {
		
		$window.resize(function() {
			
			$('.isotope-grid').isotope('reLayout');
			
		});
		
	},
	
	bind: function() {
		
		$('#filter a').bind('click', function(e) {
			e.preventDefault();
			$('#isotope').isotope({
				filter: $(this).attr('data-filter')
			});
		});
		
		// vote sum - just for example
		$('body').on('click', '.fav', function(e) {
			e.preventDefault();
			if(!$(this).hasClass('voted')) {
				$(this).addClass('voted').html(parseInt($(this).html()) + 1);
			}
		});
		
	},
	
	isotopeFilter: function() {
		
		$('#filter li:first a').addClass('active');
		
		$('#filter li a').bind('click', function() {
			$('#filter a').removeClass('active');
			$(this).addClass('active');
		});
		
	},
	
	background: function() {
		backgroundResize($('#full-bg img'), {
            viewport: {
                width: $window.width(),
                height: $window.height()
            }
        });
	},
	
	isotope: function() {
		
		var $container = $('.isotope-grid');
		$container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});
	},
	
	gallery: function() {
		
		$("a[data-plugin^='prettyPhoto']").prettyPhoto({
			animation_speed:'fast',
			theme:'light_square',
			autoplay_slideshow:false,
			social_tools:false,
			default_width: 630,
			default_height: 420,
		});
		
	}
};
/*global $:false*/
var $window = $(window);

var Blog = {
	
	start: function() {
		
		Blog.onResize();
		
		Blog.isotope();
		
		Blog.onLoad();
		
		Blog.bind();
		
		Blog.slides();
		
		Blog.gallery();
		
	},
	
	onLoad: function() {
		
		$(document).ready(function() {
			
			Blog.isotope();
			
		});
		
	},
	
	onResize: function() {
		
		$window.resize(function() {
			
			$('#isotope').isotope('reLayout');
			
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
		$('body').on('click', 'a.vote', function(e) {
			e.preventDefault();
			if(!$(this).hasClass('voted')) {
				$(this).addClass('voted').html(parseInt($(this).html()) + 1);
			}
		});
		
		// load more
		$('#load-more').bind('click', function() {
			$.ajax({
				url: 'data/blog.html',
				success: function(html) {
					
					$('#isotope').append(html)
					.isotope('reloadItems')
					.isotope();
					
					Blog.slides();
		
					Blog.gallery();
					
				}
			});
		});
		
		$('.slides img').bind('click', function() {
			$(this).closest('.slides').find('.slidesjs-next').click();
		});
		
	},
	
	slides: function() {
		
		$('.slides').slidesjs({
			height: 300,
			width: 312
		});
	},
	
	isotope: function() {
		
		var $container = $('.isotope-grid');
		$container.isotope({
			transformsEnabled: false
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
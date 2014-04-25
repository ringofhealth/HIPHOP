/*global $:false*/
var $window = $(window);

var $slides = $('.slides');

var Post = {
	
	start: function() {
		
		Post.onResize();
		
		Post.onLoad();
		
		Post.bind();
		
		Post.slides();
		
	},
	
	onLoad: function() {
		
		$(document).ready(function() {
			
			
			
		});
		
	},
	
	onResize: function() {
		
		$window.resize(function() {
			
			
			
		});
		
	},
	
	bind: function() {
		
		
		
	},
	
	slides: function() {
		
		$slides.slidesjs();
		
	}
};
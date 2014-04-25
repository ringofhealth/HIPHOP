/*global $:false*/
var closeSidebarTime;

var bgVideo = $('#bg-video');

var videoControls = $('.control-right');

var $slides = $('.slides');

var Post = {
	
	start: function() {
		
		Post.initVideo();
		
		Post.bind();
		
		Post.slides();
		
		Post.form();
		
	},
	
	initVideo: function() {
		
		bgVideo.mb_YTPlayer({startAt:0});
		
		closeSidebarTime = setTimeout(function() {
			$('.control-right .close-sidebar').trigger('click');
		}, 3000);
		
	},
	
	bind: function() {
		
		$('#sidebar .close-sidebar').bind('click', function() {
			
			$('#sidebar').toggleClass('closed');
			
		});
		
		$('.control-right .close-sidebar').bind('click', function() {
			
			clearTimeout(closeSidebarTime);
			
			$('#right').toggleClass('closed');
			
			$('.control-right').toggleClass('closed');
			
		});
		
		$('a[href="#"]').bind('click', function(e) {
			e.preventDefault();
		});
		
		// video controls binding
		// 3. play/pause
		$('a.play-pause', videoControls).bind('click', function() {
			console.log(1);
			$(this).toggleClass('play pause');
			if($(this).hasClass('pause')) {
				bgVideo.getPlayer().playVideo();
			}else{
				bgVideo.getPlayer().pauseVideo();
			}
		});
		// 3. mute/unmute
		$('a.unmute-mute', videoControls).bind('click', function() {
			$(this).toggleClass('unmute mute');
			if($(this).hasClass('mute')) {
				bgVideo.unmuteYTPVolume();
				bgVideo.setYTPVolume(100);
			}else{
				bgVideo.muteYTPVolume(0);
			}
		});
		
	},
	
	playVideo: function(item) {
		
		bgVideo.changeMovie({
			videoURL: item.find('a').attr('data-youtube-id'),
			startAt: parseInt(item.find('a').attr('data-start-second')),
			mute: false,
			vol: 100,
		});
	},
	
	form: function() {
		
		var $reply = $('form.reply');
		
		$('button', $reply).bind('click', function(e) {
			
			e.preventDefault();
			
			$.ajax({
				url: $reply.attr('action'),
				type: $reply.attr('method'),
				dataType: 'json',
				data: $reply.serialize(),
				success: function(data) {
					
					if(data.success) {
						
						$('input, textarea', $reply).removeClass('error').val('');
						
						$('.success').fadeIn(300);
						setTimeout(function() {
							$('.success').fadeOut(300);
						},3000);
						
					}else{
						
						$('input, textarea', $reply).removeClass('error');
						
						for (var i = 0; i<data.length; i++) {
							
							$('input[name="' + data[i] + '"], textarea[name="' + data[i] + '"]', $reply).addClass('error');
							
						}
					}
				}
			});
		});
		
	},
	
	slides: function() {
		
		$slides.slidesjs();
		
	}
};
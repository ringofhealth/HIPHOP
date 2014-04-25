var $window = $(window);
var bgVideo = $('#bg-video');
var currentProgress = $('#video-slide .video-progress');
var videoSlide = $('#video-slide');
var videoPlaylist = $('#video-slide .playlist');
var videoControls = $('#video-slide .video-controls');
var closeSidebar = $('#sidebar .close-sidebar');
var closeVideos = $('.close', videoControls);
var progressInterval;
var ytpLostTime = 0;
var barHover,seekTo,startAt;
var startLostTime = 5;

var Home = {

    start: function() {

        Home.initVideo();
        Home.bind();
        Home.progressChange();

    },

    initVideo: function() {

        Home.playlistSize();
        Home.startVideoTitles();
        bgVideo.mb_YTPlayer({onReady:Home.progressBar, startAt:0});
        bgVideo.on("YTPEnd", Home.videoEnd);
        Home.playlistScroll();

    },

    openSidebar: function() {
        $('#sidebar').removeClass('closed');
        $('.video-titles').addClass('left');
    },

    closeSidebar: function() {
        $('#sidebar').addClass('closed');
        $('.video-titles').removeClass('left');
    },

    openVideos: function() {
        videoSlide.removeClass('closed');
        $('a.close', videoControls).removeClass('closed');
    },

    closeVideos: function() {
        videoSlide.addClass('closed');
        $('a.close', videoControls).addClass('closed');
    },

    sidebarIsOpen: function() {
        return !$('#sidebar').hasClass('closed') ? true : false;
    },

    videosIsOpen: function() {
        return !videoSlide.hasClass('closed') ? true : false;
    },

    bind: function() {

        closeSidebar.bind('click', function() {

            if(!Home.sidebarIsOpen()) {

                if(Home.videosIsOpen()) {

                    Home.closeVideos();

                    setTimeout(function() {

                        Home.openSidebar();

                    }, 300);

                }else{

                    Home.openSidebar();

                }

            }else{

                Home.closeSidebar();

            }
        });

        closeVideos.bind('click', function() {

            if(!Home.videosIsOpen()) {

                if(Home.sidebarIsOpen()) {

                    Home.closeSidebar();

                    setTimeout(function() {

                        Home.openVideos();

                    }, 300);

                }else{

                    Home.openVideos();

                }

            }else{

                Home.closeVideos();

            }
        });


        $('a[href="#"]').bind('click', function(e) {
            e.preventDefault();
        });


        $('.playlist a', videoSlide).bind('click', function() {

            Home.playVideo($(this).closest('li'));

        });

        // video controls binding
        // 1. previous video
        $('a.prev', videoControls).bind('click', function() {
            Home.unpause();
            playingIndex = $('li', videoPlaylist).index($('li.active', videoPlaylist));
            item = (playingIndex <= 0) ? $('li:last', videoPlaylist) : $('li:eq(' + (playingIndex - 1) + ')', videoPlaylist);
            Home.playVideo(item);
        });

        // 2. next video
        $('a.next', videoControls).bind('click', function() {
            Home.unpause();
            playingIndex = $('li', videoPlaylist).index($('li.active', videoPlaylist));
            item = ((playingIndex+1) >= $('li', videoPlaylist).length) ? $('li:first', videoPlaylist) : $('li:eq(' + (playingIndex + 1) + ')', videoPlaylist);
            Home.playVideo(item);
        });

        // 3. play/pause
        $('a.play-pause', videoControls).bind('click', function() {
            if($('#paused').hasClass('paused')) {
                $('#paused').removeClass('paused');
            }else{
                $('#paused').addClass('paused');
            }
            if($(this).hasClass('pause')) {
                $(this).removeClass('pause').addClass('play');
                bgVideo.getPlayer().pauseVideo();
            }else{
                $(this).removeClass('play').addClass('pause');
                bgVideo.getPlayer().playVideo();
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

    progressChange: function() {

        $('#video-slide .video-bar').mousemove(function(e) {
            barHover = 100 - Math.ceil((($(window).width() - e.pageX) / $(window).width()) * 100);

            $('#video-slide .video-pin').css('left', 100 - (($(window).width() - e.pageX) / $(window).width() * 100) + '%');
        });

        $('#video-slide .video-bar').bind('click', function() {

            seekTo = Math.ceil(barHover*((bgVideo.manageYTPProgress().totalTime-startLostTime)/100));
            bgVideo.seekToYTP(seekTo);

        });
    },

    playlistSize: function() {

        videoPlaylist.css('width', $('li', videoPlaylist).outerWidth() * $('li', videoPlaylist).length);

    },

    playlistScroll: function() {

        var sum = videoPlaylist.width();

        $window.mousemove(function(e) {
            x = -(((e.pageX - videoPlaylist.position().left) / videoSlide.width()) * (sum - videoSlide.width()));

            videoPlaylist.css({
                'marginLeft': x + 'px'
            });
        });

    },

    unpause: function() {
        if($('#paused').hasClass('paused')) {
            $('#paused').removeClass('paused');
        }
        if($('a.play-pause', videoControls).hasClass('play')) {
            $('a.play-pause', videoControls).removeClass('play').addClass('pause');
        }
    },

    startVideoTitles: function() {

        var itemA = $('li:first',videoPlaylist).find('a');
            $('.video-titles', videoSlide).append('<h3 id="video-title-1">' + itemA.attr('data-title-1') + '</h3>');


    },

    videoTitles: function(item) {
        var itemA = item.find('a');

        $('.video-titles', videoSlide).css('opacity',0);

        setTimeout(function() {
            $('.video-titles', videoSlide)
            .empty()
            .append('<h3 id="video-title-1">' + itemA.attr('data-title-1') + '</h3>')
            /*.append('<h3 id="video-title-2">' + itemA.attr('data-title-2') + '</h3>')*/
            .css('opacity',1);
        }, 300);


    },

    playVideo: function(item) {

        $('.preloader').remove();

        Home.unpause();

        Home.videoTitles(item);
        $('li', videoPlaylist).removeClass('active').find('.play').html('Play video');
        item.addClass('active').find('.play').html('Now playing ..');

        Home.unsetProgress();

        clearInterval(progressInterval);

        var muteState = bgVideo.getCurrentVolume() > 0 ? false : true;

        ytpLostTime = 5;

        bgVideo.changeMovie({
            videoURL: item.find('a').attr('data-youtube-id'),
            startAt: parseInt(item.find('a').attr('data-start-second')),
            mute: muteState,
            vol: 100,
        });

        Home.videoInit();
    },

    unsetProgress: function() {

        currentProgress.css('width', 0);

    },

    progressBar: function() {

        var progressPercent;

        var realStartTime = (bgVideo.manageYTPProgress().currentTime <= 0) ? true : false;

        var progressInterval = setInterval(function() {

            if(($('#bg-video').manageYTPProgress().currentTime - ytpLostTime) < 0) {
                ytpLostTime = 0;
            }

            progressPercent = (((bgVideo.manageYTPProgress().currentTime - ytpLostTime) / (bgVideo.manageYTPProgress().totalTime - 8)) * 100);

            currentProgress.css('width', progressPercent + '%');

        }, 1000);

        Home.videoInit();

    },

    videoInit: function() {

        startAt = parseInt($('#video-slide .playlist li.active a').attr('data-start-second'));

        startLostTime = (startAt > 0) ? 0 : 7;

    },

    videoEnd: function() {

        if(!$('.next', videoControls).hasClass('animate')) {

            $('.next', videoControls).addClass('animate');

            // do once
            setTimeout(function() {
                $('.next', videoControls).removeClass('animate');
                $('.next', videoControls).click();
            }, 1000);
        }

    }
};

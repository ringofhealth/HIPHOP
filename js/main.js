/*global $:false*/
var App = {

    start: function() {

        App.bind();
        App.onResize();

    },

    onResize: function() {

        $(window).resize(function() {

        });

    },

    bind: function() {

        $('a[href="#"]').bind('click', function(e) {
            e.preventDefault();
        });
    }
};

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-44599513-3', 'shegotgame.ca');
  ga('send', 'pageview');
$(function() {
            var austDay = new Date();
            austDay = new Date(2014, 3, 25, 0, 0);
            $('#defaultCountdown').countdown({
                until: austDay,
                format: 'dHMs'
            });
        });

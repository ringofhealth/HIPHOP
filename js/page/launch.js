/*global $:false, google:false*/
var mapObject, marker;
var InfoBox;
var myPin = new google.maps.LatLng(43.6558967, -79.3807147);
var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(43.657011, -79.3701248),
    panControl: false,
    zoomControl: false,
    scrollwheel: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    overviewMapControl: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
};

var btn_zoom_in = document.getElementById('zoomin');
if (btn_zoom_in !== null) {
    google.maps.event.addDomListener(btn_zoom_in, 'click', function() {
        mapObject.setZoom(mapObject.getZoom() + 1 );
    });
}

var btn_zoom_out = document.getElementById('zoomout');
if (btn_zoom_out !== null) {
    google.maps.event.addDomListener(btn_zoom_out, 'click', function() {
        mapObject.setZoom(mapObject.getZoom() - 1 );
    });
}

var styles = [{
    "stylers": [
        { "invert_lightness": true },
        { "saturation": -100 },
        { "gamma": 0.9},
        { "lightness": 15 }
    ]
},{
    "elementType": "labels.text.fill",
    "stylers": [
        { "color": "#6b6b6b" }
    ]
},{
    "elementType": "labels.text",
    "stylers": [
        { "color": "#6b6b6b" },
        { "weight": 0.1 },
        { "visibility": "on" }
    ]
}];

var pinImage = new google.maps.MarkerImage('img/marker.png');

var Mapping = {

    start: function() {

        Mapping.bind();
        Mapping.createMap();
        Mapping.createMarker();
        Mapping.createInfo();
        Mapping.getInTouch();

    },

    bind: function() {

    },

    createMap: function() {

        mapObject = new google.maps.Map(document.getElementById('map'), mapOptions);
        mapObject.setOptions({styles: styles});

    },

    createMarker: function() {

        marker = new google.maps.Marker({
            position: myPin,
            map: mapObject,
            title: 'Hello World!',
            icon: pinImage
        });

    },

    createInfo: function() {

        var boxText = document.createElement("div");
        boxText.style.cssText = "color:#fff; font-size:18px; postion:relative;font-family: 'Roboto', serif; font-weight:100;" ;
        boxText.innerHTML = "<div id='marker-label'>279 Yonge Street,<br>Toronto";

        var infoOptions = {
            content: boxText,
            disableAutoPan: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-15, -165),
            zIndex: null,
            boxStyle: {
                background: "url('img/cafe.png') no-repeat",
                width: "400px",
                height: "215px"
            },
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "mapPane",
            enableEventPropagation: true
            /*
            ,position: new google.maps.LatLng(49.47216, -123.76307)
            */
        };

        var ib = new InfoBox(infoOptions);
        ib.open(mapObject, marker);

    },


};

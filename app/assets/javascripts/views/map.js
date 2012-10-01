(function() {

  var DEFAULT_CENTER = new google.maps.LatLng(39, -103);
  var ZOOM_LEVEL = 4;

  views.Map = Backbone.View.extend({

    initialize: function() {
      this.map = new google.maps.Map(this.el, {
        center: DEFAULT_CENTER,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: ZOOM_LEVEL
      });
    },

    centerMap: function(newCenter) {
      this.map.setCenter(newCenter);
    }

  });

})();


// var directionsDisplay;
// var directionsService;
// var map;

// function initialize() {
  // directionsService = new google.maps.DirectionsService();
  // directionsDisplay = new google.maps.DirectionsRenderer();
  // var chicago = new google.maps.LatLng(37.772323, -122.214897);
  // var mapOptions = {
    // zoom:7,
    // mapTypeId: google.maps.MapTypeId.ROADMAP,
    // center: chicago
  // }
  // map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  // directionsDisplay.setMap(map);

  // $.get("/tripcasts", function(tripcastsJson) {

    // var list = $(".tripcasts ol");

    // _.each(tripcastsJson, function(tripcast, i) {

      // var listItem = $("<li></li>").text(tripcast.name);
      // list.append(listItem);

      // var locations = tripcast.locations;
      // var latLngs = _.map(locations, function(latLngPair) {
        // return new google.maps.LatLng(latLngPair[0], latLngPair[1]);
      // });

      // var line = new google.maps.Polyline({
        // path: latLngs,
        // strokeColor: "#1111bb",
        // strokeOpacity: 1.0,
        // strokeWeight: 2
      // });
      // line.setMap(map);

      // var marker = new google.maps.Marker({
        // position: latLngs[0],
        // title: tripcast.name,
        // map: map,
        // image: "/assets/flag.png"
      // });

      // google.maps.event.addListener(marker, 'click', tripcastClicked);
      // google.maps.event.addListener(line, 'click', tripcastClicked);
      // listItem.on("click", tripcastClicked);

      // function tripcastClicked(e) {
        // console.log("tripcast selected!", tripcast.name);

        // list.find("li").removeClass("active");
        // listItem.addClass("active");
        // line.setOptions({ strokeColor: "#aa0000" });
      // }
    // });

  // });

// }

// function calcRoute(start, end) {
  // var request = {
    // origin:start,
    // destination:end,
    // travelMode: google.maps.TravelMode.DRIVING
  // };
  // directionsService.route(request, function(result, status) {
    // if (status == google.maps.DirectionsStatus.OK) {
      // directionsDisplay.setDirections(result);
    // }
  // });


// }

// // initialize();

// $("button[name='go']").on("click", function(event) {
  // var start = $("input[name='start']").val();
  // var end = $("input[name='end']").val();

  // calcRoute(start, end);

  // event.preventDefault();
// });


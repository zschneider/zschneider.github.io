var map;
var infowindow;
var pos;
var markerarray = [];
var search_type = 0;

function initialize() {

  var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);
  map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 10,
        center: pyrmont
      });

  service = new google.maps.places.PlacesService(map);

  var input = /** @type {HTMLInputElement} */(
      document.getElementById('autocomplete'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  var autocomplete = new google.maps.places.Autocomplete(
    (input),
    {
      types: ['(cities)'],
    });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    var place = autocomplete.getPlace();
    clearAllMarkers();
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    performSearch();
  });

	if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      map.setZoom(17);
      map.setCenter(pos);
    }, handleNoGeolocation());
  }
  else {
    handleNoGeolocation();
  }
  google.maps.event.addListener(map, 'idle', performSearch);
}

function handleNoGeolocation() {
  pos = new google.maps.LatLng(39.8282, -98.5795);
  map.setCenter(pos);
  map.setZoom(4);
}

function clearAllMarkers() {
  console.log("HI");
  for (var i = 0; i < markerarray.length; i++) {
    markerarray[i].setMap(null);
  }
  markerarray = [];
}

function clearMarkersIfOutOfBounds() {
  var mapBounds = map.getBounds();
  for (var i = 0; i < markerarray.length; i++) {
    if (!(mapBounds.contains(markerarray[i].getPosition()))) {
      markerarray[i].setMap(null);
    }
  }
}

function performSearch() {
  clearMarkersIfOutOfBounds();

  request_ewaste = {
    location: pos,
    bounds: map.getBounds(),
    keyword: 'ewaste e-waste electronics recycling'
  };

  request_reg = {
    location: pos,
    bounds: map.getBounds(),
    keyword: 'recycle recycling'
  };  

  if (search_type == 0) {
    service.nearbySearch(request_reg, callback);
  }
  else {
    service.nearbySearch(request_ewaste, callback);
  }
}

function callback(results, status) {
  var index_reg = -1;

	if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      // check if this place already has a marker.
      for (var j = 0; j < markerarray.length; j++) {
        if ((markerarray[j] != null) && 
            (results[i].geometry.location.A == markerarray[j].position.A) &&
            (results[i].geometry.location.F == markerarray[j].position.F)) {
          index_reg = j;
          break;
        }
      }
      if (!(index_reg > -1)) {
        markerarray[markerarray.length] = createMarker(results[i]);
      }
    }
  }
}

function createMarker(place) {
  	var placeLoc = place.geometry.location;
  	var marker = new google.maps.Marker({
    	map: map,
    	position: place.geometry.location,
  	});

  	marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');

  	infowindow = new google.maps.InfoWindow();

    var place_request = {
        placeId: place.place_id
      };

    google.maps.event.addListener(marker, 'click', function() {
      service.getDetails(place_request, function(place, status) {
        var content = '<p><b>'+
          place.name +
          '</b></p>'+
          '<p>'+
          place.formatted_address +
          '</p> <p>' + 
          place.formatted_phone_number +
          '</p>'
        if (typeof place.website != 'undefined') {
          content = content+"<p><a href="+place.website+">"+place.website+"</a></p>"
        }
        if (typeof place.opening_hours != 'undefined' && 
          typeof place.opening_hours.open_now != 'undefined') {
            var d = new Date();

            if (place.opening_hours.open_now) {
              content = content+"<p class='text-success'>"+place.opening_hours.weekday_text[d.getDay()]+"</p>";
            }
            else {
              content = content+"<p class='text-danger'>"+place.opening_hours.weekday_text[d.getDay()]+"</p>";
            }   
          }
        infowindow.setContent(content);

        });
        infowindow.open(map, this);
      });

      
  	// google.maps.event.addListener(marker, 'click', function() {
   //    // get place details.
    

  		var content = '<p><b>'+
  			place.name +
  			'</b></p>'+
  			'<p>'+
  			place.vicinity+
  			'</p>'
  		if (typeof place.opening_hours != 'undefined' && 
  			typeof place.opening_hours.open_now != 'undefined') {
 	  		if (place.opening_hours.open_now) {
	  			content = content+"<p class='text-success'>Open Now!</p>";
	  		}
	  		else {
	  			content = content+"<p class='text-danger'>Currently closed.</p>";
	  		}
	  	}
   //  	infowindow.setContent(content);
   //  	infowindow.open(map, this);
  	// });
    return marker;
}

google.maps.event.addDomListener(window, 'load', initialize);
$(document).ready(function(){
   $("#allMapStuff").css({ opacity: 1, zoom: 1 });
   $("#regRecycling").click(function() {
    search_type = 0;
    clearAllMarkers();
    performSearch();
   });
   $("#eRecycling").click(function() {
    search_type = 1;
    clearAllMarkers();
    performSearch();
   });
});

var map;
var infowindow;
var pos;
var markerarray = [];

function initialize() {

  //var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

	if(navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	    pos = new google.maps.LatLng(position.coords.latitude,
	                                     position.coords.longitude);
		request_ewaste = {
    		location: pos,
    		radius: 25000,
    		keyword: 'ewaste electronics recycling'
    	};

    	request_reg = {
    		location: pos,
    		radius: 25000,
    		keyword: 'recycle recycling'
    	}

    	map = new google.maps.Map(document.getElementById('map-canvas'), {
    		center: pos,
    		zoom: 10
  		});
  		
  		var service = new google.maps.places.PlacesService(map);
  		service.nearbySearch(request_reg, callback_reg);
  		service.nearbySearch(request_ewaste, callback_green);
		});
	}
}


function callback_reg(results, status) {
	var color = "blue";
  	if (status == google.maps.places.PlacesServiceStatus.OK) {
    	for (var i = 0; i < results.length; i++) {
    		if ($.inArray(results[i],maerkerarray)) {
    			createMarker(results[i], "purple");
    		}
    		else {
      			createMarker(results[i], color);
      			markerarray[markerarray.length] = results[i];
      		}
    	}
  	}
}

function callback_green(results, status) {
	var color = "green";
  	if (status == google.maps.places.PlacesServiceStatus.OK) {
    	for (var i = 0; i < results.length; i++) {
      		if ($.inArray(results[i],maerkerarray)) {
    			createMarker(results[i], "purple");
    		}
    		else {
      			createMarker(results[i], color);
      			markerarray[markerarray.length] = results[i];
      		}
    	}
  	}
}


function createMarker(place, color) {
  	var placeLoc = place.geometry.location;
  	var marker = new google.maps.Marker({
    	map: map,
    	position: place.geometry.location
  	});

  	if (color == "green") {
  		marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
  	} else if (color == "blue") {
  		marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
  	} else if (color == "purple") {
  		marker.setIcon('http://maps.google.com/mapfiles/ms/icons/purple-dot.png');
  	}

  	infowindow = new google.maps.InfoWindow();

  	google.maps.event.addListener(marker, 'click', function() {
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
    	infowindow.setContent(content);
    	infowindow.open(map, this);
  	});
}

google.maps.event.addDomListener(window, 'load', initialize);

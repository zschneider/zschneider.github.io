var map;
var infowindow;
var pos;

function initialize() {

  //var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

	if(navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	    pos = new google.maps.LatLng(position.coords.latitude,
	                                     position.coords.longitude);
		request = {
    		location: pos,
    		radius: 25000,
    		keyword: 'ewaste electronics recycling'
    	};

    	map = new google.maps.Map(document.getElementById('map-canvas'), {
    		center: pos,
    		zoom: 10
  		});
    	infowindow = new google.maps.InfoWindow();
  		
  		var service = new google.maps.places.PlacesService(map);
  		service.nearbySearch(request, callback);
		});
	}
}

function newMap() {

  //var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

	if(navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	    pos = new google.maps.LatLng(position.coords.latitude,
	                                     position.coords.longitude);
		request = {
    		location: pos,
    		radius: 25000,
    		keyword: 'recycle recycling'
    	};

    	map = new google.maps.Map(document.getElementById('map-canvas'), {
    		center: pos,
    		zoom: 10
  		});
    	infowindow = new google.maps.InfoWindow();
  		
  		var service = new google.maps.places.PlacesService(map);
  		service.nearbySearch(request, callback);
		});
	}
}

function callback(results, status) {
  	if (status == google.maps.places.PlacesServiceStatus.OK) {
    	for (var i = 0; i < results.length; i++) {
      		createMarker(results[i]);
    	}
  	}
}

function createMarker(place) {
  	var placeLoc = place.geometry.location;
  	var marker = new google.maps.Marker({
    	map: map,
    	position: place.geometry.location
  	});

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
google.maps.event.addDomListener(document.getElementById('reg_rec'), 'click', newMap);
google.maps.event.addDomListener(document.getElementById('ewaste'), 'click', initialize);
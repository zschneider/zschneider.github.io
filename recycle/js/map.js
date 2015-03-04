var map_ewaste;
var map_reg;
var infowindow;
var pos;

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

    	map_ewaste = new google.maps.Map(document.getElementById('map-ewaste'), {
    		center: pos,
    		zoom: 10
  		});
  		
  		var service = new google.maps.places.PlacesService(map_ewaste);
  		service.nearbySearch(request_ewaste, callback_ewaste);

  		request_reg = {
    		location: pos,
    		radius: 25000,
    		keyword: 'recycle recycling'
    	};

    	map_reg = new google.maps.Map(document.getElementById('map-reg'), {
    		center: pos,
    		zoom: 10
  		});
  		
  		service = new google.maps.places.PlacesService(map_reg);
  		service.nearbySearch(request_reg, callback_reg);

		});
	}
}

function callback_ewaste(results, status) {
  	if (status == google.maps.places.PlacesServiceStatus.OK) {
    	for (var i = 0; i < results.length; i++) {
      		createEwasteMarker(results[i]);
    	}
  	}
}

function callback_reg(results, status) {
  	if (status == google.maps.places.PlacesServiceStatus.OK) {
    	for (var i = 0; i < results.length; i++) {
      		createMarker(results[i]);
    	}
  	}
}

function createEwasteMarker(place) {
  	var placeLoc = place.geometry.location;
  	var marker = new google.maps.Marker({
    	map: map_ewaste,
    	position: place.geometry.location
  	});

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
    	infowindow.open(map_ewaste, this);
  	});
}

function createMarker(place) {
  	var placeLoc = place.geometry.location;
  	var marker = new google.maps.Marker({
    	map: map_reg,
    	position: place.geometry.location
  	});

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
    	infowindow.open(map_reg, this);
  	});
}

//google.maps.event.addDomListener(window, 'load', initialize);
$('#ewastediv').on('shown.bs.collapse', function (e) {
    initialize();
    })
$('#regdiv').on('shown.bs.collapse', function (e) {
    initialize();
    })

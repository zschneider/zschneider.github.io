// var map;

// function initialize() {
//   var mapOptions = {
//     zoom: 5
//   };
//   map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);

//   // Try HTML5 geolocation
//   if(navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = new google.maps.LatLng(position.coords.latitude,
//                                        position.coords.longitude);

//       var infowindow = new google.maps.InfoWindow({
//         map: map,
//         position: pos,
//         content: 'Location found using HTML5.'
//       });

//       map.setCenter(pos);

//       var request = {
//     	location: pos,
//    	 	radius: '25000',
//     	keyword: 'electronics recycling ewaste'
//   	  };

//   	  service = new google.maps.places.PlacesService(map);
//   	  service.nearbySearch(request, callback);

//     }, function() {
//       handleNoGeolocation(true);
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleNoGeolocation(false);
//   }
// }


// function handleNoGeolocation(errorFlag) {
//   if (errorFlag) {
//     var content = 'Error: The Geolocation service failed.';
//   } else {
//     var content = 'Error: Your browser doesn\'t support geolocation.';
//   }

//   var options = {
//     map: map,
//     position: new google.maps.LatLng(60, 105),
//     content: content
//   };

//   var infowindow = new google.maps.InfoWindow(options);
//   map.setCenter(options.position);
// }

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }

// google.maps.event.addDomListener(window, 'load', initialize);

var map;
var infowindow;
var pos;
var request;

function initialize() {

  //var pyrmont = new google.maps.LatLng(-33.8665433, 151.1956316);

	if(navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	    pos = new google.maps.LatLng(position.coords.latitude,
	                                     position.coords.longitude);
		var request = {
    		location: pos,
    		radius: 25000,
    		keyword: 'ewaste electronics recycling'
    	};

		});
	}

	map = new google.maps.Map(document.getElementById('map-canvas'), {
    	center: pos,
    	zoom: 10
  	});


  	infowindow = new google.maps.InfoWindow();
  	var service = new google.maps.places.PlacesService(map);
  	service.nearbySearch(request, callback);
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
    	infowindow.setContent(place.name);
    	infowindow.open(map, this);
  	});
}

google.maps.event.addDomListener(window, 'load', initialize);
var googleMapsApp = angular.module("googleMapsApp", []);
googleMapsApp.controller("googleMapsController", function($scope, $http){
	
	$scope.filteredCities = '';
	//sets the initial lat and long in the center of the US map
	var myLatlng = {lat: 40.000, lng: -98.000};
	//defines map for Google
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 5,
		center: myLatlng,
		mapTypeId: 'terrain'
	});

	//makes array of all the markers that are generated based on the lat / long of each city
	var markers = [];

	var infoWindow = new google.maps.InfoWindow({});

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;

	//makes the marker for each city
	function createMarker(city){
		var icon = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=•%7CFE7569";
		// if(city.yearRank == 1){
		// 	icon = 'images/1.png';
		// }else if(city.yearRank == 39){
		// 	icon = 'images/atl.png';
		// }
		var myLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker(
	        {
	            position: myLatlng,
	            map: map,
	            title: city.city,
	            icon: icon
	        }
	    );
		
		//adds click event listener that makes the info window pop open when the marker's clicked
		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.setContent(city.city);
			infoWindow.open(map, marker);
		});

		//pushes newly created markers to array outside function
		markers.push(marker);
	};	

	//makes city names clickable to open up info window for each city when clicked
	$scope.triggerClick = function(index){
		google.maps.event.trigger(markers[index], 'click')
	};

	//shows/hides info for each city (doesn't work when cities have been narrowed down)
	$scope.toggle = function(index){
		$scope.filteredCities[index].clicked = !$scope.filteredCities[index].clicked;
	};
		
	//loops through cities and creates markers for each city in the cities array
	$scope.cities = cities;
	for(var i = 0; i < $scope.cities.length; i++){
		createMarker($scope.cities[i]);
	};

	$scope.updateMarkers = function(){
		for(var i = 0; i < markers.length; i++){
			markers[i].setMap(null);
		}
		markers = [];
		for(var i = 0; i < $scope.filteredCities.length; i++){
		createMarker($scope.filteredCities[i]);
		}
	};

	//problem with directions displaying in total at first glance
	$scope.getDirections = function(){
		var origin = $scope.selectedStart;
		var destination = $scope.selectedEnd;

		if(origin && destination){
		    directionsDisplay.setMap(map);
		    directionsDisplay.setPanel(document.getElementById('left-panel'));
		    directionsService.route({
		          origin: origin,
		          destination: destination,
		          travelMode: 'DRIVING'
		        }, function(response, status) {
		          if (status === 'OK') {
		            directionsDisplay.setDirections(response);
		          } else {
		            window.alert('Directions request failed due to ' + status);
		          }
		        });
	    // directionsDisplay.setMap(null);
		}
	};

	$scope.startCity = [
		'New York',
		'Los Angeles',
		'Chicago',
		'Houston',
		'Philadelphia',
		'Phoenix',
		'San Antonio',
		'San Diego',
		'Dallas',
		'San Jose',
		'Austin',
		'Jacksonville',
		'San Francisco',
		'Indianapolis',
		'Columbus',
		'Fort Worth',
		'Charlotte',
		'Detroit',
		'El Paso',
		'Seattle',
		'Denver',
		'Washington',
		'Memphis',
		'Boston',
		'Nashville',
		'Baltimore',
		'Oklahoma City',
		'Portland',
		'Las Vegas',
		'Louisville',
		'Milkwaukee',
		'Albuquerque',
		'Tucson',
		'Fresno',
		'Sacramento',
		'Long Beach',
		'Kansas City',
		'Mesa',
		'Atlanta'
	];

	$scope.zoomToCity = function(lat, lon){
		// var bounds = new google.maps.LatLng();
		var cityLatLon = new google.maps.LatLng(lat, lon);
		map = new google.maps.Map(
			document.getElementById('map'),
			{ 
				zoom: 13,
				center: cityLatLon
			}
		);

		 infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        var places = $scope.mySelectedPlace;
        service.nearbySearch({
          location: cityLatLon,
          radius: 5000,
          type: [places]
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createPointOfInterest(results[i]);
          }
        }
        console.log(results);
      };

      function createPointOfInterest(place) {
	        var placeLoc = place.geometry.location;
	        var marker = new google.maps.Marker({
	          map: map, 
	          position: place.geometry.location, 
	          icon: place.icon,

	        });

	        google.maps.event.addListener(marker, 'click', function() {
	          infowindow.setContent('<div><strong>' + place.name + '</strong></div>' + '<div>Rating: ' + place.rating +'</div>' + '<div>Address: ' + place.vicinity +'</div>' );
	          infowindow.open(map, this);
	        });
	        // bounds.extend(marker.getPosition());
	  } 

	// map.fitBounds(bounds);

	$scope.places = [
	    'accounting',
	    'airport',
	    'amusement_park',
	    'aquarium',
	    'art_gallery',
	    'atm',
	    'bakery',
	    'bank',
	    'bar',
	    'beauty_salon',
	    'bicycle_store',
	    'book_store',
	    'bowling_alley',
	    'bus_station',
	    'cafe',
	    'campground',
	    'car_dealer',
	    'car_rental',
	    'car_repair',
	    'car_wash',
	    'casino',
	    'cemetery',
	    'church',
	    'city_hall',
	    'clothing_store',
	    'convenience_store',
	    'courthouse',
	    'dentist',
	    'department_store',
	    'doctor',
	    'electrician',
	    'electronics_store',
	    'embassy',
	    'establishment (deprecated)',
	    'finance (deprecated)',
	    'fire_station',
	    'florist',
	    'food (deprecated)',
	    'funeral_home',
	    'furniture_store',
	    'gas_station',
	    'general_contractor (deprecated)',
	    'grocery_or_supermarket',
	    'gym',
	    'hair_care',
	    'hardware_store',
	    'health (deprecated)',
	    'hindu_temple',
	    'home_goods_store',
	    'hospital',
	    'insurance_agency',
	    'jewelry_store',
	    'laundry',
	    'lawyer',
	    'library',
	    'liquor_store',
	    'local_government_office',
	    'locksmith',
	    'lodging',
	    'meal_delivery',
	    'meal_takeaway',
	    'mosque',
	    'movie_rental',
	    'movie_theater',
	    'moving_company',
	    'museum',
	    'night_club',
	    'painter',
	    'park',
	    'parking',
	    'pet_store',
	    'pharmacy',
	    'physiotherapist',
	    'place_of_worship (deprecated)',
	    'plumber',
	    'police',
	    'post_office',
	    'real_estate_agency',
	    'restaurant',
	    'roofing_contractor',
	    'rv_park',
	    'school',
	    'shoe_store',
	    'shopping_mall',
	    'spa',
	    'stadium',
	    'storage',
	    'store',
	    'subway_station',
	    'synagogue',
	    'taxi_stand',
	    'train_station',
	    'transit_station',
	    'travel_agency',
	    'university',
	    'veterinary_care',
	    'zoo'
	];

});
var googleMapsApp = angular.module("googleMapsApp", []);
googleMapsApp.controller("googleMapsController", function($scope, $http){
	
	$scope.filteredCities = '';
	//sets the initial lat and long in the center of the US map
	var myLatlng = {lat: 40.000, lng: -98.000};
	//defines map for Google
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 5,
		center: myLatlng
	});

	//makes array of all the markers that are generated based on the lat / long of each city
	var markers = [];

	//makes the marker for each city
	function createMarker(city){
		var icon = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=•%7CFE7569";
		if(city.rank == 1){
			icon = 'images/1.png';
		}else if(city.yearRank == 39){
			icon = 'images/atl.png';
		}
		var myLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker(
	        {
	            position: myLatlng,
	            map: map,
	            title: city.city,
	            icon: icon
	        }
	    );

		//generates popup that displays city's name
		var infoWindow = new google.maps.InfoWindow({
			content: city.city
		});

		//adds click event listener that makes the info window pop open when the marker's clicked
		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.open(map, marker);
		});

		//pushes newly created markers to array outside function
		markers.push(marker);
	}	

	//makes city names clickable to open up info window for each city when clicked
	$scope.triggerClick = function(index){
		google.maps.event.trigger(markers[index], 'click')
	}

	//shows/hides info for each city 
	$scope.toggle = function(index){
		$scope.cities[index].clicked = !$scope.cities[index].clicked;
	// 	// $scope.filteredCities[index].clicked = !$scope.filteredCities[index].clicked;
	};
		
	//loops through cities and creates markers for each city in the cities array
	$scope.cities = cities;
	for(var i = 0; i < $scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}

	$scope.updateMarkers = function(){
		for(var i = 0; i < markers.length; i++){
			markers[i].setMap(null);
		}
		markers = [];
		for(var i = 0; i < $scope.filteredCities.length; i++){
		createMarker($scope.filteredCities[i]);
		}
	}

	var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('list-window'));
    directionsService.route({
          origin: 'Atlanta, GA',
          destination: 'New York, NY',
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

});
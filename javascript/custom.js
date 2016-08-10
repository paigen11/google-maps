var googleMapsApp = angular.module("googleMapsApp", []);
googleMapsApp.controller("googleMapsController", function($scope, $http){
	
	//sets the initial lat and long in the center of the US map
	var myLatlng = {lat: 40.000, lng: -98.000};
	//defines map for Google
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: myLatlng
	});

	//makes array of all the markers that are generated based on the lat / long of each city
	var markers = [];

	//makes the marker for each city
	function createMarker(city){
		console.log(city);
		var myLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker(
	        {
	            position: myLatlng,
	            map: map,
	            title: city.city
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

	//loops through cities and creates markers for each city in the cities array
	$scope.cities = cities;
	for(var i = 0; i < $scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}

});
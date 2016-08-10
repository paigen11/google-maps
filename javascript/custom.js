var googleMapsApp = angular.module("googleMapsApp", []);
googleMapsApp.controller("googleMapsController", function($scope, $http){
	
	var myLatlng = {lat: 40.000, lng: -98.000};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: myLatlng
	});

	function createMarker(city){
		console.log(city);
		var myLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker(
	        {
	            position: myLatlng,
	            map: map,
	            title: 'Click to zoom'
	        }
	    );
	}	

	$scope.cities = cities;
	for(var i = 0; i < $scope.cities.length; i++){
		createMarker($scope.cities[i]);
	}

});
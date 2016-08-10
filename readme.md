#What is it?
------------
Map displaying the top 40 most populous cities in the US (and their accompanying facts) using HTML, SASS, JavaScript AngularJS and the Google Maps API.

##Languages Used
------------
*HTML
  * CSS (through SASS)
  * Native JavaScript
  * AngularJS

##Link to Github documents 
------------
[Github](https://github.com/paigen11/google-maps.git)

##Authors
------------
Paige Niedringhaus

##Screenshots
------------
To add later

Further Info
------------
The cities are all called with a function that sets them as objects with an array containing all the relevant data for each. 

Once they're defined, the Google Maps API is incorporated into the page and the latitude and longitude of each city is passed to the createMarker function with drops a pin for each city into the Google map, which is given a starting point in the center of the US.

An event listener is added to each marker, so when it's clicked on the name of that city populates above the marker. This same function can also be accessed by clicking the linked city names to the right of the map.

Code Examples
------------
JavaScript for creating the markers for each city
```function createMarker(city){
		console.log(city);
		var myLatlng = {lat: city.lat, lng: city.lon};
		var marker = new google.maps.Marker(
	        {
	            position: myLatlng,
	            map: map,
	            title: city.city
	        }
	    );```

AngularJS that makes the city names clickable and opens up their name above their pin on the map
```$scope.triggerClick = function(index){
		google.maps.event.trigger(markers[index], 'click')
	}```	    
#What is it?
------------
Map displaying the top 40 most populous cities in the US (and their accompanying facts) using HTML, SASS, JavaScript, AngularJS and the Google Maps API. Users can get directions between two cities, zoom in to the city's center and choose from a long list of points of interest to display in each city.

##Languages Used
------------
  * HTML
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
Display driving directions: 
![alt text](https://github.com/paigen11/google-maps/blob/master/screenshots/google-maps-directions.png 'google-maps-directions.png')

Display/hide city information with button: 
![alt text](https://github.com/paigen11/google-maps/blob/master/screenshots/google-maps-display-hide-city-info.png 'google-maps-display-hide-city-info.png')

Display ability to filter cities with input box and button: 
![alt text](https://github.com/paigen11/google-maps/blob/master/screenshots/google-maps-filter-cities.png 'google-maps-filter-cities.png')

Display ability to filter points of interest within cities:
![alt text](https://github.com/paigen11/google-maps/blob/master/screenshots/google-maps-filter-display-poi.png 'google-maps-display-poi.png')

Further Info
------------
The cities are all called with a function that sets them as objects with an array containing all the relevant data for each. Angular hides the city info except for the name until a user clicks the button to display more information about them.

Once they're defined, the Google Maps API is incorporated into the page and the latitude and longitude of each city is passed to the createMarker function with drops a pin for each city into the Google map, which is given a starting view point in the center of the US.

An event listener is added to each marker, so when it's clicked on the name of that city populates above the marker. This same function can also be accessed by clicking the linked city names to the right of the map. Only one marker at a time can be opened to prevent the page from looking cluttered.

If users want, they can get directions between two cities by selecting an origin and desination city using the box in the top left of the screen. The turn by turn directions are displayed at the bottom of the screen.

Users can also zoom in to city centers by clicking the zoom button next to each city in the table, and they can even select from different types of places they want to view through Google Places (restaurants, gyms, dentists, etc.). When they click a place icon, they can see the name of the business, the address and the rating (if the business has any ratings).

Code Examples
------------
JavaScript for creating the markers for each city

```javascript
function createMarker(city){
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

```javascript
$scope.triggerClick = function(index){
		google.maps.event.trigger(markers[index], 'click')
	}```	    


AngularJS to zoom in to city centers and display selected places

```javascript
$scope.zoomToCity = function(lat, lon){
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
      }```	
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
const AutoComplete = function (map) {
	console.log('');
  this.map = map;
}

AutoComplete.prototype.autoCompleteBox = function (selectedId, geolocation) {

	// const geolocation = {
	// 	lat: 55.953252,
	// 	lng: -3.188267
	// }

	const circle = new google.maps.Circle({
        center: geolocation,
        radius: 50000
  });

  var autocomplete = new google.maps.places.Autocomplete(selectedId, circle);
  return autocomplete;
}

module.exports = AutoComplete;

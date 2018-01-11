const AutoComplete = function (map) {
  this.map = map;
}

AutoComplete.prototype.autoCompleteBox = function (selectedId, geolocation) {
	const circle = new google.maps.Circle({
        center: geolocation,
        radius: 50000
  });

  var autocomplete = new google.maps.places.Autocomplete(selectedId, circle);
  return autocomplete;
}

module.exports = AutoComplete;

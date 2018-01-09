const DirectionsWrapper = function () {
	console.log('');
}

DirectionsWrapper.prototype.calculateAndDisplayRoute = function (map, start, end) {
  const directionsService = new google.maps.DirectionsService;
  const directionsDisplay = new google.maps.DirectionsRenderer;
  directionsDisplay.setMap(map);
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: 'BICYCLING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

module.exports = DirectionsWrapper;

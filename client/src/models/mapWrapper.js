const MapWrapper = function () {

}

MapWrapper.prototype.newMap = function (container, coords, zoom) {
	const map = new google.maps.Map(container, {
		center: coords,
		zoom: zoom
	});
	return map;
}

MapWrapper.prototype.geoLocate = function (callback) {
	navigator.geolocation.getCurrentPosition(function (position) {

		const center = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};

		callback(center);
	});
}

module.exports = MapWrapper;

const MapWrapper = function (container, coords, zoom) {
  const map = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

MapWrapper.prototype.addMarker = function (coords) {
  var marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    animation: google.maps.Animation.DROP
  });
  return marker;
}

MapWrapper.prototype.addClickEvent = function () {
  google.maps.event.addListener(this.googleMap, 'click', function (event) {
    var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
    this.addMarker(position);
  }.bind(this));
}

MapWrapper.prototype.addInfoWindow = function (coords, text) {
  var marker = this.addMarker(coords);
  marker.addListener('click', function () {
    var infoWindow = new google.maps.InfoWindow({
      content: text
    });
    infoWindow.open(this.map, marker);
  });
}

MapWrapper.prototype.geoLocate = function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    var center = { lat: position.coords.latitude, lng: position.coords.longitude };
    this.googleMap.setCenter(center);
    this.addMarker(center);
  }.bind(this));
}

module.exports = MapWrapper;

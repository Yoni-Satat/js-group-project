const MapWrapper = require('../models/mapWrapper.js');
const mapWrapper = new MapWrapper();

const Explore = function () {

}

Explore.prototype.exploreFunction = function () {
	const container = document.querySelector('#container');
	const homeForm = document.querySelector('#home-form');
	const form = document.querySelector('#save-location');
	container.innerHTML = "";
	homeForm.innerHTML = "";
	form.innerHTML = "";

	container.classList.remove("list-contain");
	container.classList.add("container");

	const coords = sessionStorage.getItem('geoLocation');
	let center = ""
	if (coords) {
		center = JSON.parse(coords);
		createMap(container, center);
	} else {
		mapWrapper.geoLocate(function(geoLocation){
			sessionStorage = window.sessionStorage;
			const jsonCoords = JSON.stringify(geoLocation);
			sessionStorage.setItem('geoLocation', jsonCoords);
			createMap(container, geoLocation);
		})
	}

};

const createMap = function (container, center) {
	const map = mapWrapper.newMap(container, center, 13);

	const marker = new google.maps.Marker({
		position: center,
		map: map
	});

	const infowindow = new google.maps.InfoWindow({
		content: "You are here!"
	});

	marker.setMap(map);

	infowindow.open(map, marker);

}

module.exports = Explore;

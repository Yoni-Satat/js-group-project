const MapWrapper = require('../models/mapWrapper.js');

const Explore = function () {

}

Explore.prototype.exploreFunction = function () {

	const mapWrapper = new MapWrapper();
	const container = document.querySelector('#container');
	const homeForm = document.querySelector('#home-form');
	const form = document.querySelector('#save-location');
	form.innerHTML = "";

	container.classList.remove("list-contain");
	container.classList.add("container");

	if (container.innerHTML !== "") {
		container.innerHTML = "";
	}
	if (homeForm.innerHTML !== "") {
		homeForm.innerHTML = "";
	}

	const coords = localStorage.getItem('geoLocation');
	let center = ""
	if (coords) {
		center = JSON.parse(coords);
	} else {
		center = {
			"lat": 46.32118,
			"lng": -5.3891737
		}
		console.log('doesnt');
	}

	const map = mapWrapper.newMap(container, center, 15);

	const marker = new google.maps.Marker({
	position: center,
	map: map
	});

	const infowindow = new google.maps.InfoWindow({
	content: "You are here!"
	});

	marker.setMap(map);

	infowindow.open(map, marker);

};

module.exports = Explore;

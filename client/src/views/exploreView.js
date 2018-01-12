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

	const center = {
		lat: 55.946962,
		lng: -3.20195
	}
	const map = mapWrapper.newMap(container, center, 19);

};

module.exports = Explore;

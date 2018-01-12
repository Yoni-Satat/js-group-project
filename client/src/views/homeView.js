const AutoComplete = require('../models/autoCompleteWrapper.js');
const MapWrapper = require('../models/mapWrapper.js');
const DirectionsWrapper = require('../models/directionsWrapper.js');
const Route = require('../models/route.js');
const Request = require('../services/request.js');
const mapWrapper = new MapWrapper();

const Home = function () {

}

Home.prototype.homeFunction = function () {
	const autoComplete = new AutoComplete();

	const container = document.querySelector('#container');
	const homeForm = document.querySelector('#home-form');
	const form = document.querySelector('#save-location');
	container.innerHTML = "";
	homeForm.innerHTML = "";
	form.innerHTML = "";


	container.classList.remove("list-contain");
	container.classList.add("container");

	const lineBreak = document.createElement('br');
	const lineBreakTwo = document.createElement('br');

	const destinationInput = document.createElement('input');
	destinationInput.id = "destination-input"
	const feildLabel = document.createElement('label');
	feildLabel.innerText = 'Destination';
	const locationLabel = document.createElement('label');
	locationLabel.innerText = 'From My Location';

	homeForm.appendChild(feildLabel);
	destinationInput.disabled = true;
	destinationInput.placeholder = 'Fetching location';
	homeForm.appendChild(destinationInput);

	const goButton = document.createElement('button');
	goButton.id = 'go-button';
	goButton.className = 'hvr-underline-from-center';
	goButton.innerText = 'Go';
	goButton.disabled = true;
	container.appendChild(goButton);

	const coords = localStorage.getItem('geoLocation');
	if (coords) {
		const geoLocation = JSON.parse(coords);
		autoComplete.autoCompleteBox(destinationInput, geoLocation);
		destinationInput.disabled = false;
		goButton.disabled = false;
		destinationInput.placeholder = 'Enter a destination';
	} else {
		mapWrapper.geoLocate(function(geoLocation){
			destinationInput.disabled = false;
			goButton.disabled = false;
			destinationInput.placeholder = 'Enter a destination';
			autoComplete.autoCompleteBox(destinationInput, geoLocation);
			localStorage = window.localStorage;
			const jsonCoords = JSON.stringify(geoLocation);
			localStorage.setItem('geoLocation', jsonCoords);
		})
	};

	goButton.removeEventListener('click', goButtonFunction);
	goButton.addEventListener('click', goButtonFunction);
}

const goButtonFunction = function () {
	const destinationInput = document.querySelector('#destination-input');

	if (destinationInput.value === '') {
		destinationInput.placeholder = 'Please select a destination'
	} else {
		const finish = destinationInput.value;

		const coords = localStorage.getItem('geoLocation');
		const geoLocation = JSON.parse(coords);

		const map = mapWrapper.newMap(container, geoLocation, 7);

		const directionsWrapper = new DirectionsWrapper();
		directionsWrapper.calculateAndDisplayRoute(map, geoLocation, finish);

		const saveButton = document.createElement('button');
		saveButton.innerText = "Save";
		saveButton.id="save-button"

		const form = document.querySelector('#save-location');
		form.appendChild(saveButton);

		saveButton.addEventListener('click', saveRouteFunction);
	}
};

const saveRouteFunction = function () {
	const saveButton = document.querySelector('#save-button');
	saveButton.className="hvr-icon-bounce";
	saveButton.innerText= "saved";
	saveButton.disabled = true;
	const destinationInput = document.querySelector('#destination-input');
	const finish = destinationInput.value;

	const coords = localStorage.getItem('geoLocation');
	const geoLocation = JSON.parse(coords);
	const lat = geoLocation.lat;
	const lng = geoLocation.lng;
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAobv2IGaN5L5BmVSJAVtsuAaK2MXL9mic`
	const addressRequest = new Request(url)
	addressRequest.get(function(address) {
		const addressDetails = address.results[0].address_components;
		const start = `${addressDetails[0].long_name} ${addressDetails[1].short_name}, ${addressDetails[2].long_name}, ${addressDetails[6].long_name}`;
		const route = new Route(start, finish, false);
		const request = new Request('http://localhost:3000/api/routes');
		request.post(function(addedEntity) {
		}, route);
	});

};

module.exports = Home;

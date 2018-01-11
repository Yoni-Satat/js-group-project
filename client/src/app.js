const Request = require('./services/request.js');
const MapWrapper = require('./views/mapWrapper.js');
const AutoComplete = require('./views/autoCompleteWrapper.js');
const DirectionsWrapper = require('./views/directionsWrapper.js');
const Route = require('./models/route.js');

const app = function() {

	const homeButton = document.querySelector('#home');
	homeButton.addEventListener('click', homeFunction);

	const listViewButton = document.querySelector('#list-view');
	listViewButton.addEventListener('click', displayRoutes);

	const aboutButton = document.querySelector('#about');
	aboutButton.addEventListener('click', aboutFunction);

	const exploreButton = document.querySelector('#explore');
	exploreButton.addEventListener('click', exploreFunction);

	console.log('END OF APP');
}

const homeFunction = function () {

	autoComplete = new AutoComplete();

	const container = document.querySelector('#container');
	const homeForm = document.querySelector('#home-form');
	const form = document.querySelector('#save-location');
	form.innerHTML = "";
	if (container.innerHTML !== "") {
		container.innerHTML = "";
	}
	if (homeForm.innerHTML !== "") {
		homeForm.innerHTML = "";
	}

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
	const mapWrapper = new MapWrapper();
	mapWrapper.geoLocate(function(geoLocation){
		destinationInput.disabled = false;
		destinationInput.placeholder = 'Enter a location';
		autoComplete.autoCompleteBox(destinationInput, geoLocation);
	});

	const goButton = document.createElement('button');
	goButton.className = 'hvr-underline-from-center';

	goButton.innerText = 'Go';
	container.appendChild(goButton);

	goButton.removeEventListener('click', goButtonFunction);
	goButton.addEventListener('click', goButtonFunction);
}

const saveButtonFunction = function () {
  const saveButton = document.querySelector('button');
  saveButton.innerText = "Save";
  const form = document.querySelector('#save-location');
  form.appendChild(saveButton);
	saveButton.addEventListener('click', saveRouteFunction);
}

const goButtonFunction = function () {
	const directionsWrapper = new DirectionsWrapper();
	const mapWrapper = new MapWrapper();
	const destinationInput = document.querySelector('#destination-input');
	const finish = destinationInput.value;
	mapWrapper.geoLocate(function(geoLocation){
		const map = mapWrapper.newMap(container, geoLocation, 7);
		directionsWrapper.calculateAndDisplayRoute(map, geoLocation, finish);
	});

  const saveButton = document.createElement('button');
  saveButton.innerText = "Save";
	saveButton.id="save-button"
  const form = document.querySelector('#save-location');
  form.appendChild(saveButton);
	saveButton.addEventListener('click', saveRouteFunction);
};

const saveRouteFunction = function () {
	const saveButton = document.querySelector('#save-button');
	saveButton.className="hvr-icon-bounce";
	saveButton.innerText= "saved";
	saveButton.disabled = true;
	const mapWrapper = new MapWrapper();
	const destinationInput = document.querySelector('#destination-input');
	const finish = destinationInput.value;
	mapWrapper.geoLocate(function(geoLocation){
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
	});
};

const displayRoutes = function () {
	const container = document.querySelector('#container');
	const homeForm = document.querySelector('#home-form');
	const form = document.querySelector('#save-location');
	form.innerHTML = "";
	if (container.innerHTML !== "") {
		container.innerHTML = "";
	}
	if (homeForm.innerHTML !== "") {
		homeForm.innerHTML = "";
	}
	container.classList.remove("container");
	container.classList.add("list-contain");

	const directionsWrapper = new DirectionsWrapper();
	const mapWrapper = new MapWrapper();

	const mapDiv = document.createElement('div');
	mapDiv.id = 'map';
	ulBox = document.createElement('div');
	ulBox.className="list-box";

	const request = new Request('http://localhost:3000/api/routes');

	request.get(function(savedRoutes) {
		savedRoutes.reverse();
		savedRoutes.forEach(function(route) {
			const ulDisplayRoutes = document.createElement('ul');
			const liStart = document.createElement('li');
			liStart.innerText = route.start;
			const liEnd = document.createElement('li');
			liEnd.innerText = route.end;
			const deleteBtn = document.createElement('button');
			deleteBtn.innerText = 'Delete';
			const done = document.createElement('button');
			if (route.done) {
				done.innerText = 'Route completed'
			} else {
				done.innerText = 'Mark done';
			}
			const liShowOnMap = document.createElement('button');
			liShowOnMap.innerText = 'Display on map';
			const line = document.createElement('hr');
			ulDisplayRoutes.className = "hvr-underline-from-left";
			container.appendChild(ulBox);
			ulBox.appendChild(ulDisplayRoutes);
			ulDisplayRoutes.appendChild(liStart);
			ulDisplayRoutes.appendChild(liEnd);
			ulDisplayRoutes.appendChild(liShowOnMap);
			ulDisplayRoutes.appendChild(deleteBtn);
			ulDisplayRoutes.appendChild(done);
			ulDisplayRoutes.appendChild(line);
			liShowOnMap.addEventListener('click', function () {
				mapDiv.innerHTML = "";
				const map = mapWrapper.newMap(mapDiv, {lat: 55.9469, lng: -3.2015}, 2);
				directionsWrapper.calculateAndDisplayRoute(map, route.start, route.end);
			});
			deleteBtn.addEventListener('click', function() {
				const url = `http://localhost:3000/api/routes/${route._id}`
				const request = new Request(url);
				request.delete(function(deletedEntity) {
				}, route);
				displayRoutes();
			});
			const doneFunction = function () {
				route.done = !route.done;
				const request = new Request(`http://localhost:3000/api/routes/${route._id}`)
				request.put(function(updatedEntity) {
				}, {done: route.done});
				if (route.done) {
					done.innerText = 'Route completed'
				} else {
					done.innerText = 'Mark done';
				}
			};
			done.addEventListener('click', doneFunction);
			container.appendChild(mapDiv);
		});
	});
}

const exploreFunction = function () {

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

const aboutFunction = function () {
	const container = document.querySelector('#container');
	const homeForm = document.querySelector('#home-form');

	container.classList.remove("list-contain");
	container.classList.add("container");

	if (container.innerHTML !== "") {
		container.innerHTML = "";
	}
	if (homeForm.innerHTML !== "") {
		homeForm.innerHTML = "";
	}

	homeForm.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}

document.addEventListener('DOMContentLoaded', app);

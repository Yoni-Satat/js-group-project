const Request = require('./services/request.js');
const MapWrapper = require('./views/mapWrapper.js');
const AutoComplete = require('./views/autoCompleteWrapper.js');
const DirectionsWrapper = require('./views/directionsWrapper.js');
const Route = require('./models/route.js');

const app = function() {
  autoComplete = new AutoComplete();
  directionsWrapper = new DirectionsWrapper();
  const mapWrapper = new MapWrapper();

  const homeFunction = function () {

    var input = document.getElementById('destination-input');

    const container = document.querySelector('#container');
    homeForm = document.querySelector('#home-form');
    homeForm.innerHTML = "";

    container.innerHTML = "";
    const lineBreak = document.createElement('br');
    const lineBreakTwo = document.createElement('br');

    const destinationInput = document.createElement('input');
    destinationInput.id = "destination-input"
    const feildLabel = document.createElement('label');
    feildLabel.innerText = 'destination';
    // feildLabel.id = 'destination-input';
    const locationLabel = document.createElement('label');
    locationLabel.innerText = 'From My Location';
    locationLabel.id = 'destination-label';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    homeForm.appendChild(feildLabel);
    homeForm.appendChild(destinationInput);
    homeForm.appendChild(lineBreak);
		// container.appendChild(locationLabel);
		// container.appendChild(checkBox);

		autoComplete.autoCompleteBox(destinationInput);

		const goButton = document.createElement('button');
    goButton.className = 'hvr-underline-from-center';

		goButton.innerText = 'Go';
		container.appendChild(goButton);

		checkBox.addEventListener('click', function() {
			console.log('checked');
		});

		goButton.addEventListener('click', function() {
			const finish = destinationInput.value;
			mapWrapper.geoLocate(function(geoLocation){
				const map = mapWrapper.newMap(container, geoLocation, 7);
				directionsWrapper.calculateAndDisplayRoute(map, geoLocation, finish);
			});
			const saveRouteButton = document.querySelector('#save-route');

			saveRouteButton.addEventListener('click', function() {
				mapWrapper.geoLocate(function(geoLocation){
					const lat = geoLocation.lat;
					const lng = geoLocation.lng;
					console.log(geoLocation);
					const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAobv2IGaN5L5BmVSJAVtsuAaK2MXL9mic`
					const addressRequest = new Request(url)
					addressRequest.get(function(address) {
						const addressDetails = address.results[0].address_components;
						const addressToDisplay = `${addressDetails[0].long_name} ${addressDetails[1].short_name}, ${addressDetails[2].long_name}, ${addressDetails[6].long_name}`;

						const start = addressToDisplay;
						const route = new Route(null, start, finish);
						const request = new Request('http://localhost:3000/api/routes');
						request.post(function(addedEntity) {
						}, route);
					});
				});
			});
		});
	}

	const displayRoutes = function () {
		const container = document.querySelector('#container');
		container.innerHTML = "";
    homeForm.innerHTML = "";


		const mapDiv = document.createElement('div');
		mapDiv.id = 'map';
		container.appendChild(mapDiv);

		const request = new Request('http://localhost:3000/api/routes');

		request.get(function(savedRoutes) {
			savedRoutes.forEach(function(route) {
				const ulDisplayRoutes = document.createElement('ul');
				const liStart = document.createElement('li');
				liStart.innerText = route.start;
				const liEnd = document.createElement('li');
				liEnd.innerText = route.end;
				const liShowOnMap = document.createElement('li');
				liShowOnMap.innerText = 'Display on map';
				const line = document.createElement('hr');
				container.appendChild(ulDisplayRoutes);
        ulDisplayRoutes.className = "hvr-underline-from-left";
				ulDisplayRoutes.appendChild(liStart);
				ulDisplayRoutes.appendChild(liEnd);
				ulDisplayRoutes.appendChild(liShowOnMap);
				ulDisplayRoutes.appendChild(line);
				ulDisplayRoutes.addEventListener('click', function () {
					mapDiv.innerHTML = "";
					const map = mapWrapper.newMap(mapDiv, {lat: 55.9469, lng: -3.2015}, 2);
					directionsWrapper.calculateAndDisplayRoute(map, route.start, route.end);
				});
			});
		});
	}

	const exploreFunction = function () {
		console.log('clicked');
		const container = document.querySelector('#container');
    homeForm.innerHTML = "";

		container.innerHTML = "";
		const center = {
			lat: 55.946962,
			lng: -3.20195
		}
		const map = mapWrapper.newMap(container, center, 19);
	};

	const resetContainer = function () {
		const container = document.querySelector('#container').innerHTML = "";
		console.log('reset called');
	}

	const homeButton = document.querySelector('#home');
	homeButton.addEventListener('click', homeFunction);

	const aboutButton = document.querySelector('#about');
	aboutButton.addEventListener('click', function() {
		console.log('clicked');
	});

	const exploreButton = document.querySelector('#explore');
	exploreButton.addEventListener('click', exploreFunction);

	const listViewButton = document.querySelector('#list-view');
	listViewButton.addEventListener('click', function() {
		console.log('clicked');
		displayRoutes();

	});

	console.log('END OF APP');

}

document.addEventListener('DOMContentLoaded', app);

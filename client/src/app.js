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
    const homeForm = document.querySelector('#home-form');
    container.innerHTML = "";
    const lineBreak = document.createElement('br');
    const lineBreakTwo = document.createElement('br');

    const destinationInput = document.createElement('input');
    // destinationInput.id = "destination-input"
    const feildLabel = document.createElement('label');
    feildLabel.innerText = 'destination';
    feildLabel.id = 'destination-input'
    const locationLabel = document.createElement('label');
    locationLabel.innerText = 'From My Location';
    locationLabel.id = 'destination-label';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    homeForm.appendChild(feildLabel);
    homeForm.appendChild(destinationInput);
    homeForm.appendChild(lineBreak);
    homeForm.appendChild(locationLabel);
    homeForm.appendChild(checkBox);

    autoComplete.autoCompleteBox(destinationInput);

    const goButton = document.createElement('button');
    goButton.innerText = 'Go';
    goButton.id ='goButton'
    homeForm.appendChild(lineBreakTwo);
    homeForm.appendChild(goButton);

    checkBox.addEventListener('click', function() {
      console.log('checked');
    });

    goButton.addEventListener('click', function() {
			const finish = destinationInput.value;

			mapWrapper.geoLocate(function(geoLocation){
				console.log(geoLocation);
				const map = mapWrapper.newMap(container, geoLocation, 7);
				directionsWrapper.calculateAndDisplayRoute(map, geoLocation, finish);
			});
      homeForm.innerHTML = "";

    });
  }

  const displayRoutes = function () {
    const container = document.querySelector('#container');
    const ulDisplayRoutes = document.createElement('ul');
    container.innerHTML = "";

    const request = new Request('http://localhost:3000/api/routes');

    request.get(function(savedRoutes) {
      savedRoutes.forEach(function(route) {
        const liStart = document.createElement('li');
        liStart.innerText = route.start;
        const liEnd = document.createElement('li');
        liEnd.innerText = route.end;
        const line = document.createElement('hr');
        container.appendChild(ulDisplayRoutes);
        ulDisplayRoutes.appendChild(liStart);
        ulDisplayRoutes.appendChild(liEnd);
        liEnd.appendChild(line);
      });

    });
  }

  const exploreFunction = function () {
    console.log('clicked');
    const container = document.querySelector('#container');
    container.innerHTML = "";
    const center = {
      lat: 55.946962,
      lng: -3.20195
    }
    const map = new MapWrapper(container, center, 19);
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

  const saveRouteButton = document.querySelector('#save-route');
  saveRouteButton.addEventListener('click', function() {
		// mapWrapper.geoLocate(function(geoLocation){
		// 	const map = mapWrapper.newMap(container, geoLocation, 7);
		// 	directionsWrapper.calculateAndDisplayRoute(map, geoLocation, finish);
		// });
    const start = document.getElementById('start').value;
    const finish = destinationInput.value;

    console.log('saveRouteButton clicked');
    const route = new Route(null, null, start, finish);
    const request = new Request('http://localhost:3000/api/routes');

    request.post(function(addedEntity) {
    }, route);

  });


  console.log('END OF APP');

}

document.addEventListener('DOMContentLoaded', app);

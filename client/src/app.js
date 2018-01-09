const Request = require('./services/request.js');
const MapWrapper = require('./views/mapWrapper.js');
const AutoComplete = require('./views/autoCompleteWrapper.js');
const DirectionsWrapper = require('./views/directionsWrapper.js');

const app = function() {
  autoComplete = new AutoComplete();
  directionsWrapper = new DirectionsWrapper();
	mapWrapper = new MapWrapper();

  const homeFunction = function () {

    const input = document.getElementById('destination-input');

    const container = document.querySelector('#container');
    container.innerHTML = "";

    const destinationInput = document.createElement('input');
    // destinationInput.id = "destination-input"
    const feildLabel = document.createElement('label');
    feildLabel.innerText = 'destination';
    feildLabel.id = 'destination-input'
    const locationLabel = document.createElement('label');
    locationLabel.innerText = 'From My Location';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    container.appendChild(feildLabel);
    container.appendChild(destinationInput);
    container.appendChild(locationLabel);
    container.appendChild(checkBox);

    const autocompleteHome = autoComplete.autoCompleteBox(destinationInput);

    const goButton = document.createElement('button');
    goButton.innerText = 'Go';
    container.appendChild(goButton);

    checkBox.addEventListener('click', function() {
      console.log('checked');
    });

    goButton.addEventListener('click', function() {
      console.log('clicked');
			const finish = 'Edinburgh, United Kingdom';
			mapWrapper.geoLocate(function(center){
				const map = mapWrapper.newMap(container, center, 7);
				directionsWrapper.calculateAndDisplayRoute(map, center, finish);
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
  });

  console.log('END OF APP');

}

document.addEventListener('DOMContentLoaded', app);

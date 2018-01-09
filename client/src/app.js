const Request = require('./services/request.js');
const MapWrapper = require('./views/mapWrapper.js');
const AutoComplete = require('./views/autoCompleteWrapper.js');
const DirectionsWrapper = require('./views/directionsWrapper.js');
const Route = require('./models/route.js');

const app = function() {
  autoComplete = new AutoComplete();
  directionsWrapper = new DirectionsWrapper();

  const homeFunction = function () {

    var input = document.getElementById('destination-input');

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

    var autocompleteHome = autoComplete.autoCompleteBox(destinationInput);

    const goButton = document.createElement('button');
    goButton.innerText = 'Go';
    container.appendChild(goButton);

    checkBox.addEventListener('click', function() {
      console.log('checked');
    });

    goButton.addEventListener('click', function() {
      console.log('clicked');

      const start = document.getElementById('start').value;
      const finish = document.getElementById('end').value;
      var map = new google.maps.Map(document.querySelector('#container'), {
        zoom: 7,
        center: {lat: 41.85, lng: -87.65}
      });

      var onChangeHandler = function() {
        directionsWrapper.calculateAndDisplayRoute(map, start, finish);
      };
      document.getElementById('start').addEventListener('change', onChangeHandler);
      document.getElementById('end').addEventListener('change', onChangeHandler);

      // autocomplete.addListener('place_changed', function()

      directionsWrapper.calculateAndDisplayRoute(map, start, finish);
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
  });

  const saveRouteButton = document.querySelector('#save-route');
  saveRouteButton.addEventListener('click', function() {
    const start = document.getElementById('start').value;
    const finish = document.getElementById('end').value;

    console.log('saveRouteButton clicked');
    const route = new Route(null, null, start, finish);
    const request = new Request('http://localhost:3000/api/routes');

    request.post(function(addedEntity) {  
    }, route);

  });


  console.log('END OF APP');

}

document.addEventListener('DOMContentLoaded', app);

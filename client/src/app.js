const Request = require('./services/request.js');
const MapWrapper = require('./views/mapWrapper.js');
const AutoComplete = require('./views/autoCompleteWrapper.js');
const DirectionsWrapper = require('./views/directionsWrapper.js');




const app = function() {
  autoComplete = new AutoComplete();
  directionsWrapper = new DirectionsWrapper();


  const homeFunction = function () {
    var directionsServiceHome = new google.maps.DirectionsService;
    var directionsDisplayHome = new google.maps.DirectionsRenderer;

    var input = document.getElementById('destination-input');



    console.log('clicked');
    const container = document.querySelector('#container');
    container.innerHTML = "";

    const destinationInput = document.createElement('input');
    const feildLabel = document.createElement('label');
    // destinationInput.id = "destination-input"
    feildLabel.innerText = 'destination';
    feildLabel.id = 'destination-input'
    container.appendChild(feildLabel);
    container.appendChild(destinationInput);
    console.log(autocompleteHome);
    var autocompleteHome = autoComplete.autoCompleteBox(destinationInput);
    console.log(autocompleteHome);

    // var card = document.getElementById('destination-input');

    // map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);


    const locationLabel = document.createElement('label');
    locationLabel.innerText = 'From My Location';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    container.appendChild(locationLabel);
    container.appendChild(checkBox);


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

  console.log('END OF APP');

}

document.addEventListener('DOMContentLoaded', app);

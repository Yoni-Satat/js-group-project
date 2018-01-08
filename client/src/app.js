const Request = require('./services/request.js');
const MapWrapper = require('./views/mapWrapper.js');





const app = function() {

  const homeFunction = function () {
    console.log('clicked');
    const container = document.querySelector('#container');
    const destinationInput = document.createElement('input');
    const feildLabel = document.createElement('label');
    feildLabel.innerText = 'destination';
    container.appendChild(feildLabel);
    container.appendChild(destinationInput);

    const locationLabel = document.createElement('label');
    locationLabel.innerText = 'From My Location';
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    container.appendChild(locationLabel);
    container.appendChild(checkBox);

    const goButton = document.createElement('button');
    goButton.innerText = 'Go';
    container.appendChild(goButton);
  };

  const exploreFunction = function () {
    console.log('clicked');
    const container = document.querySelector('#container');
    const center = {
      lat: 55.946962,
      lng: -3.20195
    }
    const map = new MapWrapper(container, center, 19);
  };



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

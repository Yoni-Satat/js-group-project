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

    checkBox.addEventListener('click', function() {
      console.log('checked');
    });

    goButton.addEventListener('click', function() {
      console.log('clicked');



      // const container = document.querySelector('#container');
      // const center = {
      //   lat: 55.946962,
      //   lng: -3.20195
      // }
      // const map = new MapWrapper(container, center, 15);
      // need to define what the pannel is ??


      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var map = new google.maps.Map(document.querySelector('#container'), {
        zoom: 7,
        center: {lat: 41.85, lng: -87.65}
      });
      directionsDisplay.setMap(map);

      var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      document.getElementById('start').addEventListener('change', onChangeHandler);
      document.getElementById('end').addEventListener('change', onChangeHandler);


      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }


      // need to make the request dynamically populated by the input boxes

    });

  }

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

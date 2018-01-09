const Request = require('./services/request.js');
const MapWrapper = require('./views/mapWrapper.js');





const app = function() {

  const homeFunction = function () {
    var directionsServiceHome = new google.maps.DirectionsService;
    var directionsDisplayHome = new google.maps.DirectionsRenderer;

    var input = document.getElementById('destination-input');



    console.log('clicked');
    const container = document.querySelector('#container');
    container.innerHTML = "";

    const destinationInput = document.createElement('input');
    const feildLabel = document.createElement('label');
    destinationInput.id = "destination-input"
    feildLabel.innerText = 'destination';
    feildLabel.id = 'destination-input'
    container.appendChild(feildLabel);
    container.appendChild(destinationInput);
    var autocompleteHome = new google.maps.places.Autocomplete(destinationInput);
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

      autocompleteHome.bindTo('destination-input');


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

      var card = document.getElementById('pac-card');
      var input = document.getElementById('pac-input');
      // var types = document.getElementById('type-selector');
      // var strictBounds = document.getElementById('strict-bounds-selector');

      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

      var autocomplete = new google.maps.places.Autocomplete(input);

      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo('bounds', map);

      var infowindow = new google.maps.InfoWindow();
      var infowindowContent = document.getElementById('infowindow-content');
      infowindow.setContent(infowindowContent);
      var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
      });

      autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
          address = [
            (place.address_components[0] && place.address_components[0].short_name || ''),
            (place.address_components[1] && place.address_components[1].short_name || ''),
            (place.address_components[2] && place.address_components[2].short_name || '')
          ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
      });


      function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
          origin: document.getElementById('start').value,
          destination: document.getElementById('end').value,
          travelMode: 'BICYCLING'
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

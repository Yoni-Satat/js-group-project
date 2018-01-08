const Request = require('./services/request.js');
const MapWrapper = require('./views/mapWrapper.js');





const app = function() {



  const homeButton = document.querySelector('#home');
  homeButton.addEventListener('click', function() {
    console.log('clicked');
  });

  const aboutButton = document.querySelector('#about');
  aboutButton.addEventListener('click', function() {
    console.log('clicked');
  });

  const exploreButton = document.querySelector('#explore');
  exploreButton.addEventListener('click', function() {
    console.log('clicked');
    const container = document.querySelector('#container');
    const center = {
      lat: 55.946962,
      lng: -3.20195
    }
    const map = new MapWrapper(container, center, 19);



  });

  const listViewButton = document.querySelector('#list-view');
  listViewButton.addEventListener('click', function() {
    console.log('clicked');
  });








  // <button type="button" name="home"></button>
  // <button type="button" name="list-view"></button>
  // <button type="button" name="about"></button>
  // <button type="button" name="explore"></button>

  console.log('END OF APP');
}

document.addEventListener('DOMContentLoaded', app);

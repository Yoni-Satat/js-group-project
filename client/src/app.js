const Request = require('./services/request.js');


const app = function() {

  const homeButton = document.querySelector('#home');
  homeButton.addEventListener('click', hoomeButtonClicked);

  const listViewButton = document.querySelector('#list-view');
  listViewButton.addEventListener('click', listViewButtonClicked);

  const aboutButton = document.querySelector('#about');
  aboutButton.addEventListener('click', aboutButtonClicked);

  const exploreButton = document.querySelector('#explore');
  exploreButton.addEventListener('click', exploreButtonClicked);

});

  // <button type="button" name="home"></button>
  // <button type="button" name="list-view"></button>
  // <button type="button" name="about"></button>
  // <button type="button" name="explore"></button>

  console.log('END OF APP');
}

document.addEventListener('DOMContentLoaded', app);

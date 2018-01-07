const Request = require('./services/request.js');


const app = function() {

  const homeButton = document.querySelector('#home');
  homeButton.addEventListener('click', homeButtonClicked);

  const listViewButton = document.querySelector('#list-view');
  homeButton.addEventListener('click', homeButtonClicked);

  const aboutButton = document.querySelector('#home');
  homeButton.addEventListener('click', homeButtonClicked);

  const exploreButton = document.querySelector('#explore');
  homeButton.addEventListener('click', homeButtonClicked);

  const homeButtonClicked = function () {
    // here requests will need to get another page.
    console.log('home clicked');
  }



  // <button type="button" name="home"></button>
  // <button type="button" name="list-view"></button>
  // <button type="button" name="about"></button>
  // <button type="button" name="explore"></button>

  console.log('END OF APP');
}

document.addEventListener('DOMContentLoaded', app);

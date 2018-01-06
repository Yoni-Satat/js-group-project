

const app = function() {

  const homeButton = document.querySelector('#home');
  homeButton.addEventListener('click', function() {
    console.log('home button clicked');
  })

  // <button type="button" name="home"></button>
  // <button type="button" name="list-view"></button>
  // <button type="button" name="about"></button>
  // <button type="button" name="explore"></button>

  console.log('END OF APP');
}

document.addEventListener('DOMContentLoaded', app);

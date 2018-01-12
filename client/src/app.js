const Home = require('./views/homeView.js');
const ListRoutes = require('./views/listRoutesView.js');
const Explore = require('./views/exploreView.js');
const About = require('./views/aboutView.js');

const app = function() {
	home = new Home();
	listRoutes = new ListRoutes();
	explore = new Explore();
	about = new About();

	const homeButton = document.querySelector('#home');
	homeButton.addEventListener('click', home.homeFunction);

	const listRoutesButton = document.querySelector('#list-routes');
	listRoutesButton.addEventListener('click', listRoutes.displayRoutes);

	const aboutButton = document.querySelector('#about');
	aboutButton.addEventListener('click', about.aboutFunction);

	const exploreButton = document.querySelector('#explore');
	exploreButton.addEventListener('click', explore.exploreFunction);

	console.log('END OF APP');
}

document.addEventListener('DOMContentLoaded', app);

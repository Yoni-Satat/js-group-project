const DirectionsWrapper = require('../models/directionsWrapper.js');
const MapWrapper = require('../models/mapWrapper.js');
const Request = require('../services/request.js');

const ListRoutes = function () {

}

ListRoutes.prototype.displayRoutes = function display () {
	const container = document.querySelector('#container');
	const homeForm = document.querySelector('#home-form');
	const form = document.querySelector('#save-location');
	form.innerHTML = "";
	if (container.innerHTML !== "") {
		container.innerHTML = "";
	}
	if (homeForm.innerHTML !== "") {
		homeForm.innerHTML = "";
	}
	container.classList.remove("container");
	container.classList.add("list-contain");

	const directionsWrapper = new DirectionsWrapper();
	const mapWrapper = new MapWrapper();

	const mapDiv = document.createElement('div');
	mapDiv.id = 'map';
	ulBox = document.createElement('div');
	ulBox.className="list-box";
	container.appendChild(ulBox);

	const request = new Request('http://localhost:3000/api/routes');

	request.get(function(savedRoutes) {
		savedRoutes.reverse();
		savedRoutes.forEach(function(route) {
			const ulDisplayRoutes = document.createElement('ul');
			const liStart = document.createElement('li');
			liStart.innerText = route.start;
			const liEnd = document.createElement('li');
			liEnd.innerText = route.end;
			const deleteBtn = document.createElement('button');
			deleteBtn.innerText = 'Delete';
			const done = document.createElement('button');
			if (route.done) {
				done.innerText = 'Route completed'
			} else {
				done.innerText = 'Mark done';
			}
			const liShowOnMap = document.createElement('button');
			liShowOnMap.innerText = 'Display on map';
			const line = document.createElement('hr');
			ulDisplayRoutes.className = "hvr-underline-from-left";
			ulBox.appendChild(ulDisplayRoutes);
			ulDisplayRoutes.appendChild(liStart);
			ulDisplayRoutes.appendChild(liEnd);
			ulDisplayRoutes.appendChild(liShowOnMap);
			ulDisplayRoutes.appendChild(deleteBtn);
			ulDisplayRoutes.appendChild(done);
			ulDisplayRoutes.appendChild(line);
			liShowOnMap.addEventListener('click', function () {
				mapDiv.innerHTML = "";
				const map = mapWrapper.newMap(mapDiv, {lat: 55.9469, lng: -3.2015}, 2);
				directionsWrapper.calculateAndDisplayRoute(map, route.start, route.end);
			});
			deleteBtn.addEventListener('click', function() {
				const url = `http://localhost:3000/api/routes/${route._id}`
				const request = new Request(url);
				request.delete(function(deletedEntity) {
				}, route);
				display();
			});
			const doneFunction = function () {
				route.done = !route.done;
				const request = new Request(`http://localhost:3000/api/routes/${route._id}`)
				request.put(function(updatedEntity) {
				}, {done: route.done});
				if (route.done) {
					done.innerText = 'Route completed'
				} else {
					done.innerText = 'Mark done';
				}
			};
			done.addEventListener('click', doneFunction);
			container.appendChild(mapDiv);
		});
	});
}

module.exports = ListRoutes;

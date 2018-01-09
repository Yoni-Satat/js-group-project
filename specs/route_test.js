const Route = require('../client/src/models/route.js');
const assert = require('assert');

describe('Route', function() {
  let route1;

  beforeEach(function() {
    route1 = new Route('this is an ID', 'school', {lat: 10, lng: 10}, {lat: 20, lng: 20} );

  });

  it('should have an ID', function() {
    assert.strictEqual(route1.id, 'this is an ID');
  });

  it('should have a title', function() {
    assert.strictEqual(route1.title, 'school');
  });

});

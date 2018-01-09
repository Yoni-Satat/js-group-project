const Route = require('../client/src/models/route.js');
const assert = require('assert');

describe('Route', function() {
  let route1;

  beforeEach(function() {
    route1 = new Route('this is an ID', 'school', 'Edinburgh', 'Aberdeen' );

  });

  it('should have an ID', function() {
    assert.strictEqual(route1.id, 'this is an ID');
  });

  it('should have a title', function() {
    assert.strictEqual(route1.title, 'school');
  });

  it('should have a start point', function() {
    assert.strictEqual(route1.start, 'Edinburgh' );
  });

  it('should have a end point', function() {
    assert.strictEqual(route1.end, 'Aberdeen');
  });

});

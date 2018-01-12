const Route = require('../client/src/models/route.js');
const assert = require('assert');

describe('Route', function() {
  let route1;

  beforeEach(function() {
    route1 = new Route('Edinburgh', 'Aberdeen', false);
  });

  it('should have a start point', function() {
    assert.strictEqual(route1.start, 'Edinburgh' );
  });

  it('should have a end point', function() {
    assert.strictEqual(route1.end, 'Aberdeen');
  });

});

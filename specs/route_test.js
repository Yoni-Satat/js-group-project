const Route = require('../client/src/models/route.js');
const assert = require('assert');

describe('Route', function() {
  let route1;

  beforeEach(function() {
    route1 = new Route('school', 'Edinburgh', 'Aberdeen', false);
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

  it('should toggle done', function() {
    route1.toggleDone();
    assert.strictEqual(route1.done, true);
  })

});

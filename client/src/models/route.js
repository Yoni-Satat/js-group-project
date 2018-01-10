const Route = function(start, end, done) {
  this.start = start;
  this.end = end;
  this.done = done;
};

Route.prototype.toggleDone = function() {
  this.done = !this.done;
};

module.exports = Route;

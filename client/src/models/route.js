const Route = function(title, start, end, done) {
  this.title = title;
  this.start = start;
  this.end = end;
  this.done = false;
};

Route.prototype.toggleDone = function() {
  this.done = !this.done;
};

module.exports = Route;

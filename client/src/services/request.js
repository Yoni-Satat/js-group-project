const Request = function(url) {
  this.url = url;
  this.responseBody = [];
}

Request.prototype.get = function(callback) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function() {
    if (this.status !== 200){
      return;
    };
    this.responseBody = JSON.parse(this.responseText);
    callback(this.responseBody);
  });
  request.send();
};

Request.prototype.post = function(callback, body) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);

  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function() {
    if (this.status!==201) {
      return;
    };
    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });
  request.send(JSON.stringify(body));
};

Request.prototype.put = function(callback, body) {
	const request = new XMLHttpRequest();
	//api/routes/1
	//req.params.id
	//req.body
	request.open('PUT', this.url);
	request.setRequestHeader('Content-Type', 'application/json');
	request.addEventListener('load', function() {
		if(this.status!==204) {
				return;
		}

		callback();
	});
	request.send(JSON.stringify(body));
}

Request.prototype.delete = function(callback) {
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function() {
    if (this.status!==204) {
      return;
    };
    callback();
  });
  request.send();
};

module.exports = Request;

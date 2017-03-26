var fs = require('fs');

var App = function (httpServer, expressServer, sessionParser, request, response) {
	this._init(httpServer, expressServer, sessionParser, request, response);
};
App.prototype = {
	_allowedSessionIds: {},
	_httpServer: null,
	_expressServer: null,
	_init: function (httpServer, expressServer, sessionParser, request, response) {
		this._httpServer = httpServer;
		this._expressServer = expressServer;
		this._sessionParser = sessionParser;
	},
	httpRequestHandler: function (request, response, callback) {
		this._completeWholeRequestInfo(request, function (requestInfo) {
			
			
			
			var staticHtmlFileFullPath = __dirname + '/../static-content/index.html';
			fs.readFile(staticHtmlFileFullPath, 'utf8', function (err,data) {
				if (err) {
					console.log(err);
					return callback();
				}
				response.send(data.replace(/%requestPath/g, requestInfo.url));
				callback();
			});
			
			
			
		}.bind(this));
	},
	_completeWholeRequestInfo: function (request, callback) {
        var reqInfo = {
            url: request.url,
            method: request.method,
            headers: request.headers,
            statusCode: request.statusCode,
            textBody: ''
        };
        var bodyArr = [];
        request.on('error', function (err) {
            console.error(err);
        }).on('data', function (chunk) {
            bodyArr.push(chunk);
        }).on('end', function () {
            reqInfo.textBody = Buffer.concat(bodyArr).toString();
            reqInfo.request = request;
            callback(reqInfo);
        }.bind(this));
    }
};

module.exports = App;
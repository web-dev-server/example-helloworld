var fs = require('fs');


/**
 * @summary	Constructor, called only for first time, when there is default directory request with index.js 
 		file inside and there is necessary to create instance of this `module.exports` content to call 
		`instance.httpRequestHandler` method to dispatch http request. If there is detected any file change
		inside this file, `web-deb-server` module automaticly reload content of this file and it creates
		instance and call this constructor again automaticly, the same behaviour if there is any catched error 
		in `httpRequestHandler` execution - this file and constructor is loaded and called again - to develop more comfortably.
 * @param {http}		http 		used node http module instance
 * @param {express}		express 	used node express module instance
 * @param {sessionParser}	sessionParser	used node sessionParser module instance
 * @param {request}		request		current http request object
 * @param {response}		response	current http response object
 * @return void
 */
var App = function (http, express, sessionParser, request, response) {
	this._httpServer = httpServer;
	this._expressServer = expressServer;
	this._sessionParser = sessionParser;
};
App.prototype = {
	/**
	 * @summary 	Method called each request to dispatch request for default directory content containing 
	 *		`index,js` file (also for first time after constructor). 
	 * @param {request}	request		current http request object
	 * @param {response}	response 	current http response object
	 * @param {function}	callback 	callback to do any other node.js operations
	 * @return void
	 */
	httpRequestHandler: function (request, response, callback) {
		this._completeWholeRequestInfo(request, function (requestInfo) {
			
			
			
			// some demo operation to say hallo world:
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
	/**
	 * @summary	Complete whole request body to operate with it later properly (encode json data or anything else...)
	 * @param	{request}	request		current http request
	 * @param	{function}	callback	callback to execute after whole request body is loaded or request loading failed
	 * @return	void
	 */
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

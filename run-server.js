var WebDevServer = require("web-dev-server");


// Create logger for any uncatched error (optional):
var logger = WebDevServer.Logger.CreateNew(__dirname, __dirname)
	.SetStreamWriting(true)
	.SetAllowedLevels([WebDevServer.Logger.LEVEL.ERROR, WebDevServer.Logger.LEVEL.CRITICIAL])
	.SetMaxLogFileSize('100M')
	.SetStackTraceWriting(true, true);


// Create web server instance.
WebDevServer.Server.CreateNew()
	// Required.
	.SetDocumentRoot(__dirname)
	// Optional, 8000 by default.
	.SetPort(8000)
	// Optional, '127.0.0.1' by default.
	//.SetDomain('127.0.0.1')
	// Optional, `true` by default to display Errors and directories.
	//.SetDevelopment(false)
	// Optional, 1 hour by default (seconds).
	//.SetSessionMaxAge(60 * 60 * 24)
	// Optional, session id hash salt.
	//.SetSessionHash('SGS2e+9x5$as%SD_AS6s.aHS96s')
	// Optional, `null` by default, useful for apache proxy modes.
	//.SetBaseUrl('/node')
	// Optional, custom place to log any unhandled errors.
	.SetErrorHandler(function (err, code, req, res) {
		logger.Error(err);
	})
	// Optional, to prepend any execution before `web-dev-server` module execution.
	.AddHandler(function (req, res, evnt, cb) {
		if (req.url == '/health') {
			res.writeHead(200);
			res.end('1');
			// Do not anything else in `web-dev-server` module for this request:
			evnt.PreventDefault();
		}
		/*setTimeout(() => {
			throw new RangeError("Uncatched test error.");
		}, 1000);*/
		cb();
	})
	// Callback param is optional. called after server has been started or after error ocured.
	.Run(function (success, err) {
		if (!success) console.error(err);
		console.log("Server is running.");
	});
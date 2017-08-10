var WebDevServer = require("web-dev-server");

var devServer = (new WebDevServer())
	.SetDocumentRoot(__dirname)		// required
	// .SetPort(8000)				// optional, 8000 by default
	// .SetDomain('localhost')		// optional, localhost by default
	// .SetDevelopment(false)		// optional, true by default to display Errors and directory content
	.AddHandler(function (req, res, e, cb) {	// optional, to prepend any execution before `web-dev-server` module execution
		if (req.url == '/health') {
			res.writeHead(200);
			res.end('1');
			e.preventDefault();		// do not anything else in `web-dev-server` module for this request
		}
		cb();
	})
	.Run();
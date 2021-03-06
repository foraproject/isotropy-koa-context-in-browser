(function() {
    "use strict";

    var libReqRes = require("isotropy-request-response-in-browser");

    var _context = require("./context");
    var NativeRequest = libReqRes.Request;
    var NativeResponse = libReqRes.Response;
    var _request = require("./request");
    var _response = require("./response");
    var Cookies = require("./cookies");

    var createFromPageJSContext = function(pageJSContext) {
        var req = new NativeRequest({
            method: "GET",
            url: pageJSContext.path,
            headers: {}
        });
        var res = new NativeResponse({});
        return createContext(req, res);
    };

    var createContext = function(req, res) {
        res.statusCode = 404;
        var context = Object.create(_context);
        var request = context.request = Object.create(_request);
        var response = context.response = Object.create(_response);
        context.app = request.app = response.app = this;
        context.req = request.req = response.req = req;
        context.res = request.res = response.res = res;
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        context.onerror = context.onerror.bind(context);
        context.originalUrl = request.originalUrl = req.url;
        context.cookies = new Cookies(req, res);
        context.state = {};
        return context;
    };

    module.exports = {
        createFromPageJSContext: createFromPageJSContext
    };
})();

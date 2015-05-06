(function() {
    "use strict";


    /**
    * Module dependencies.
    */
    var delegate = require('delegates');

    /**
    * Context prototype.
    */

    var proto = module.exports = {

        /**
        * util.inspect() implementation, which
        * just returns the JSON output.
        *
        * @return {Object}
        * @api public
        */

        inspect: function(){
            return this.toJSON();
        },

        /**
        * Return JSON representation.
        *
        * Here we explicitly invoke .toJSON() on each
        * object, as iteration will otherwise fail due
        * to the getters and cause utilities such as
        * clone() to fail.
        *
        * @return {Object}
        * @api public
        */

        toJSON: function(){
            return {
                request: this.request.toJSON(),
                response: this.response.toJSON(),
                app: this.app.toJSON(),
                originalUrl: this.originalUrl,
                req: '<original node req>',
                res: '<original node res>',
                socket: '<original node socket>',
            };
        },

        /**
        * Default error handling.
        *
        * @param {Error} err
        * @api private
        */

        onerror: function(err){
            // don't do anything if there is no error.
            // this allows you to pass `this.onerror`
            // to node-style callbacks.
            throw new Error(err);
        }
    };

    /**
    * Response delegation.
    */

    delegate(proto, 'response')
    .method('attachment')
    .method('redirect')
    .method('remove')
    .method('vary')
    .method('set')
    .method('append')
    .access('status')
    .access('message')
    .access('body')
    .access('length')
    .access('type')
    .access('lastModified')
    .access('etag')
    .getter('headerSent')
    .getter('writable');

    /**
    * Request delegation.
    */

    delegate(proto, 'request')
    .method('get')
    .method('is')
    .access('querystring')
    .access('idempotent')
    .access('socket')
    .access('search')
    .access('method')
    .access('query')
    .access('path')
    .access('url')
    .getter('href')
    .getter('subdomains')
    .getter('protocol')
    .getter('host')
    .getter('hostname')
    .getter('header')
    .getter('headers')
    .getter('secure')
    .getter('stale')
    .getter('fresh')
    .getter('ips')
    .getter('ip');
})();

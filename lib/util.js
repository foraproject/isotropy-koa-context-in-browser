(function() {
    "use strict";

    var printNotImplemented = function(method) {
        console.log("The method or property '" + method + "' is not implemented on the client.");
    };

    module.exports = {
        printNotImplemented: printNotImplemented
    };

})();

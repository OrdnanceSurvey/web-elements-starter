(function() {
    // webpack will sort out the require
    // expose ol on global scope because of the way some other libraries work :(
    //window.ol = require('./node_modules/angular-openlayers-directive/node_modules/openlayers/dist/ol-debug.js');
    window.ol = ol;
    window.proj4 = require('proj4');
    console.log('wrapper loaded ol version', ol.version);
    console.log('wrapper loaded proj4 version', proj4.version);
})();

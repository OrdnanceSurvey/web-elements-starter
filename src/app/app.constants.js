(function () {
    'use strict';

    angular
        .module('starter-app')
        .constant('ol', require('openlayers'))
        .constant('proj4', require('proj4'))
        .run(['$window', function ($window) {
            $window.proj4 = require('proj4');
        }]);
})();
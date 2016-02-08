(function () {
    'use strict';

    angular
        .module('starter-app')
        .run(['$window', function ($window) {
            $window.proj4 = require('proj4');
        }]);
})();
"use strict";
function MaxSize($timeout, $window) {
    return {
        restrict: 'A',
        require: 'openlayers',
        link: function (scope, iElement, iAttrs, olCtrl) {
            var resize = function () {
                iElement.css('height', '0px');
                iElement.css('height', iElement.parent()[0].getBoundingClientRect().height + 'px');

                olCtrl.getOpenlayersScope().getMap().then(function (map) {
                    map.updateSize();
                });
            };

            $timeout(resize);
            $window.addEventListener('resize', resize);
        }
    }
}
angular
    .module('starter-app')
    .directive('maxSize', MaxSize);
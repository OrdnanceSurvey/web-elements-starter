(function() {
    'use strict';

    angular.module('starter-app')
        .service('projection', ProjectionService);

    function ProjectionService(ol, proj4) {
        this.$inject = ['ol', 'proj4'];
        // public API
        var service = {
            'EPSG:27700': createEPSG27700()
        };
        init();
        return service;

        // ----- service implementation below

        function init() {
            ol.DOTS_PER_INCH = 90.7;
        }

        function createEPSG27700() {
            proj4.defs("EPSG:27700", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.999601 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894 +datum=OSGB36 +units=m +no_defs");
            function returnSameCoords(coord) {
                return [coord[0], coord[1]]; // identical
            }
            ol.proj.addCoordinateTransforms('EPSG:27700', 'EPSG:27700', returnSameCoords, returnSameCoords);

            return new ol.proj.Projection({
                code: 'EPSG:27700',
                extent: [-238375.0, 0, 700000, 1300000],
                units: 'm'
            });
        }
    }
})();
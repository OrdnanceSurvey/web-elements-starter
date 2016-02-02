(function () {
    "use strict";
    angular.module('starter-app')
        .controller('map-ctrl', MapController);
    function MapController($log, olData, projection) {
        this.$inject = ['$log'];

        var vm = this;
        var viewExtent = [0, 0, 700000, 1300000]; // EPSG:27700 extent
        var OSHQ = {lon: 437289.62, lat: 115545.03};

        vm.center = {
            lat: OSHQ.lat,
            lon: OSHQ.lon,
            zoom: 8,
            projection: projection['EPSG:27700']
        };
        vm.defaults = {
            interactions: {
                mouseWheelZoom: true
            },
            view: {
                center: [OSHQ.lon, OSHQ.lat],
                extent: viewExtent,
                zoom: 9,
                projection: projection['EPSG:27700']
            }
        };
        vm.view = {
            extent: viewExtent,
            zoom: 9,
            projection: projection['EPSG:27700']
        };
        vm.osPolygon = {
            name: 'custom polygon'
        };
        vm.layers = [
            makeOSLayer('Outdoor'),
            makeOSLayer('Road'),
            makeOSLayer('Light'),
            makeOSLayer('Night'),
            makeOSLayer('Leisure')
        ];
        vm.drawingLayers = [
            {
                name: 'drawing layer',
                source: {
                    type: 'GeoJSON',
                    geojson: {
                        object: {
                            "type": "FeatureCollection",
                            "features": [{
                                "type": "Feature",
                                "geometry": {
                                    "type": "GeometryCollection",
                                    "geometries": [
                                        {
                                            "type": "Polygon",
                                            "coordinates": [[[434179.68749999994, 122450.25634765625], [431958.00781249994, 119355.77392578125], [437551.87988281244, 117630.0048828125], [438960.2661132812, 121101.37939453125], [434179.68749999994, 122450.25634765625]]]
                                            //"coordinates": []
                                        },
                                        {
                                            "type": "MultiPoint",
                                            "coordinates": [[434179.68749999994, 122450.25634765625], [431958.00781249994, 119355.77392578125], [437551.87988281244, 117630.0048828125], [438960.2661132812, 121101.37939453125], [434179.68749999994, 122450.25634765625]]
                                            //"coordinates": []
                                        }
                                    ]
                                },
                                "properties": null
                            }]
                        },
                        projection: 'EPSG:27700'
                    }
                },
                style: {
                    fill: {
                        color: 'rgba(212,0,88, 0.1)'
                    },
                    stroke: {
                        color: '#D40058',
                        width: 3
                    },
                    image: {
                        circle: {
                            radius: 8,
                            fill: {
                                color: '#D40058'
                            },
                            stroke: {
                                color: '#FFFFFF',
                                width: 3
                            }
                        }
                    }
                }
            }
        ];
        vm.selectedLayer = vm.layers[0];

        function makeOSLayer(layerName) {
            var matrixIds = [
                "EPSG:27700:0",
                "EPSG:27700:1",
                "EPSG:27700:2",
                "EPSG:27700:3",
                "EPSG:27700:4",
                "EPSG:27700:5",
                "EPSG:27700:6",
                "EPSG:27700:7",
                "EPSG:27700:8",
                "EPSG:27700:9",
                "EPSG:27700:10",
                "EPSG:27700:11",
                "EPSG:27700:12",
                "EPSG:27700:13"
            ];
            //return {
            //    name: layerName,
            //    source: {
            //        type: 'XYZ',
            //        url: 'https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A27700/' + layerName + ' 27700/{z}/{x}/{y}.png?key=DxmIZsYaEDzTs1ESrTzDNZrmxhCJNGq2',
            //        projection: 'EPSG:27700',
            //        tileGrid: {
            //            origin: [-238375.0, 1376256.0],
            //            resolutions: [896.0, 448.0, 224.0, 112.0, 56.0, 28.0, 14.0, 7.0, 3.5, 1.75, 0.875, 0.4375, 0.21875, 0.109375],
            //            matrixIds: matrixIds
            //        }
            //    },
            //    visible: true,
            //    opacity: 1
            //}
            return {
                name: layerName,
                source: {
                    type: 'WMTS',// https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/wmts?key=YOUR_APP_KEY
                    url: 'https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/wmts?key=DxmIZsYaEDzTs1ESrTzDNZrmxhCJNGq2&height=256&width=256',
                    projection: 'EPSG:27700',
                    layer: 'Outdoor 27700',
                    matrixSet: 'EPSG:27700',
                    format: 'image/png',
                    tileGrid: {
                        origin: [-238375.0, 1376256.0],
                        resolutions: [896.0, 448.0, 224.0, 112.0, 56.0, 28.0, 14.0, 7.0, 3.5, 1.75, 0.875, 0.4375, 0.21875, 0.109375],
                        matrixIds: matrixIds
                    }
                },
                visible: true,
                opacity: 1
            }
        }
    }
})();
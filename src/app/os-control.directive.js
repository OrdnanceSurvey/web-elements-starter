"use strict";
function OsControl(olData) {
    return {
        restrict: 'E',
        scope: {},
        require: '^openlayers',
        controllerAs: 'ctrl',
        template: '<os-button variation="solid" colour="primary" ng-click="ctrl.toggle()">{{ctrl.type}}</os-button>',
        bindToController: {
            properties: '=osControlProperties',
            type: '@osControlType',
            uxlayer: '=uxlayer'
        },
        controller: function ($element, $timeout, $scope) {
            var vm = this;
            vm.toggle = toggle;
            vm.isActive = isActive;

            var magentaStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(212,0,88, 0.1)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#D40058',
                    width: 3
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#D40058'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffffff',
                        width: 3
                    })
                })
            });

            var noStyle = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(0,0,0, 0.0)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0,0,0, 0.0)',
                    width: 3
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: 'rgba(0,0,0, 0.0)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0,0,0, 0.0)',
                        width: 3
                    })
                })
            });

            // temporary, invisible Overlay layer
            var features = new ol.Collection();
            var featureSource = new ol.source.Vector({features: features});
            var featureOverlay = new ol.layer.Vector({
                source: featureSource,
                style: noStyle
            });

            var map;
            olData.getMap().then(function (theMap) {
                map = theMap;
                window.map = theMap;

                //$timeout(function() {
                //    map.addLayer(featureOverlay);
                //})
            });

            function getPolygonSource(map) {
                return map.getLayers().getArray().filter(function(layer) {
                    return layer.getProperties().name === 'polygons';
                })[0];
            }

            var controlTypes = {
                polygon: {
                    enable: function () {
                        var ctrl = this;
                        console.log('enable polygon');

                        featureOverlay.setMap(map);

                        var draw = new ol.interaction.Draw({
                            features: features,
                            type: 'Polygon',
                            style: noStyle
                        });




                        draw.on('drawend', function() {
                            // disable in a timeout to avoid a zoom-in because of double click
                            $timeout(function() {
                                ctrl.disable();
                            });
                            
                            $scope.$apply(function() {
                                // when drawing ends, hide the 'editing' points on each vertex
                                vm.uxlayer.style.image.circle.fill.color = 'rgba(0,0,0,0)';
                                vm.uxlayer.style.image.circle.stroke.color = 'rgba(0,0,0,0)';
                            });
                        });

                        draw.on('drawstart', function(drawEvent) {

                            drawEvent.feature.getGeometry().on('change', function(geometry) {

                                $scope.$apply(function() {
                                    vm.uxlayer.style.image.circle.fill.color = '#D40058';
                                    vm.uxlayer.style.image.circle.stroke.color = '#FFFFFF';
                                });
                                
                                // this event fires in OpenLayers, so tell Angular about it
                                var coords = geometry.currentTarget.getCoordinates();
                                $scope.$apply(function() {
                                    // add fake geometry to the real feature object.
                                    // first the polygon, then the MultiPoint fake 'editing' points for each vertex
                                    vm.uxlayer.source.geojson.object.features[0].geometry.geometries[0].coordinates = coords;
                                    vm.uxlayer.source.geojson.object.features[0].geometry.geometries[1].coordinates = coords[0];
                                    console.log('added ' + coords[0].length + ' coords');
                                });


                            });

                        });
                        
                        map.addInteraction(draw);
                        controlTypes.polygon.interaction = draw;
                    },
                    disable: function () {
                        console.log('disable polygon');
                        map.removeInteraction(controlTypes.polygon.interaction);
                        delete controlTypes.polygon.interaction;
                        featureOverlay.setMap(null);
                    }
                }
            };


            function toggle() {
                console.log('doing toggle', controlTypes[vm.type]);

                var control = controlTypes[vm.type];

                if (control.interaction && control.interaction.getActive()) {
                    control.disable();
                } else {
                    control.enable();
                }
            }

            function isActive () {
                if (control.interaction && control.interaction.getActive()) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        link: function (scope, iElement, attrs, controller) {

            olData.getMap().then(function (map) {

                function MyControl() {
                    ol.control.Control.call(this, {
                        element: iElement[0]
                    });
                }

                ol.inherits(MyControl, ol.control.Control);
                map.addControl(new MyControl());


            });

        }
    }
}

angular.module('starter-app').directive('osControl', OsControl);
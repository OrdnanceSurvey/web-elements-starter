var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var destFolder = '/build';

var config = {
    context: __dirname,
    debug: true,
    cache: true,

    verbose: true,
    displayErrorDetails: true,
    stats: {
        colors: true,
        reasons: true
    },

    entry: {
        'vendor_libs': [
            'angular',
            'angular-animate',
            'angular-aria',
            'angular-component', // polyfill component API for angular < 1.5
            'angular-messages',
            'angular-material',
            'angular-sanitize',
            './node_modules/angular-material/angular-material.css',
            'proj4',
            //'openlayers', // v3.12.1
            //'./node_modules/openlayers/dist/ol.js',

            './ol-wrapper.js', // v3.12.1

            './node_modules/openlayers/css/ol.css',

            './node_modules/os-elements/build/elements.js',
            './node_modules/os-elements/build/elements.css',

            'angular-openlayers-directive' // ol v3.8.2



            //'./node_modules/angular-openlayers-directive/dist/angular-openlayers-directive.js'
        ]
    },

    //resolve: {
    //    alias: {
    //        openlayers: '/node_modules/openlayers/dist/ol.js'
    //    }
    //},

    output: {
        path: path.join(__dirname, destFolder),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'umd'
    },

    //externals: [
    //    /ol/
    //],

    // modles to compile .less and include .css
    // in the .ts use code like: require('./button.less');
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }],
        //noParse: /(ol\.js|angular-openlayers-directive\.js)/
        noParse: /(ol\.js|ol-debug\.js|proj4\.js)/
    },

    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("[name].css")
    ]
};

module.exports = config;

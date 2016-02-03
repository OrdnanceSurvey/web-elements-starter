var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');

var destFolder = '/build';

var olExternals = {
    root: 'ol',
    commonjs2: 'openlayers',
    commonjs: 'openlayers',
    amd: 'openlayers'
};

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
            'proj4',
            'openlayers',
            'angular',
            'angular-animate',
            'angular-aria',
            'angular-component', // polyfill component API for angular < 1.5
            'angular-messages',
            'angular-material',
            'angular-sanitize',
            './node_modules/angular-material/angular-material.css',


            './node_modules/openlayers/css/ol.css',



            './node_modules/angular-openlayers-directive',


            './node_modules/os-elements/build/elements.js',
            './node_modules/os-elements/build/elements.css'
        ],
        'app': [
            "./src/app/app.js",
            "./src/app/app.constants.js",
            "./src/app/projection.service.js",
            "./src/app/map.controller.js",
            "./src/app/app.bootstrap.js"
        ]
    },

    output: {
        path: path.join(__dirname, destFolder),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js',
        libraryTarget: 'umd'
    },

    // modles to compile .less and include .css
    // in the .ts use code like: require('./button.less');
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style', 'css!less')
        }
            //{
            //test: /(ol\.js|ol-debug\.js)/,
            //test: require.resolve("./node_modules/openlayers/dist/ol-debug.js"),
            //loader: 'imports-loader?define=>false'
        //}
        ],
        //noParse: /(ol\.js|angular-openlayers-directive\.js)/
        //noParse: /(ol\.js|ol-debug\.js|proj4\.js|angular-openlayers-directive\.js)/
        noParse: /(ol\.js|ol-debug\.js|proj4\.js)/
    },

    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.OccurenceOrderPlugin(true),
        new webpack.optimize.CommonsChunkPlugin("vendor_libs", "vendor_libs.bundle.js"),
        //new webpack.ProvidePlugin({
        //    'proj4': 'proj4',
        //    'window.proj4': "proj4"
        //}),
        new LiveReloadPlugin()
    ],

    resolve: {
        alias: {
            'openlayers': path.resolve('./node_modules/openlayers/dist/ol-debug.js')
        }
    }
};

module.exports = config;

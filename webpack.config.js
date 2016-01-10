/**
 * Created by Poka on 1/7/2016.
 */
var path = require('path');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var ResolverPlugin = require('webpack/lib/ResolverPlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var metadata = {
    title: 'Webpack demo',
    baseUrl: '/',
    host: '127.0.0.1',
    port: 3003,
    ENV: ENV
};


/*
 * Config
 */
module.exports = {
    // static data for index.html
    metadata: metadata,
    // for faster builds use 'eval'
    //devtool: 'source-map',
    debug: false,

    entry: {
        vendor: [
            'jquery/dist/jquery.js'
        ],
        angular: [
            'angular/angular.js',
            'angular-ui-router/release/angular-ui-router.js',
        ],
        main: [
            './src/app.js',
            './src/app.ctrl.js',
            './src/app/views/home/home.js',
            './src/app/views/about/about.js'
        ]
    },

    // Config for our build files
    output: {
        path: root('__dist__'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        // ensure loader extensions match
        extensions: ['', '.ts', '.js', '.json', '.css', '.html'],
        root: [path.join(__dirname, "bower_components")],
        modulesDirectories: ["node_modules", "bower_components", "src"],
        alias: {
             //$: "jquery/dist/jquery.min.js",
            // jQuery: "jquery/dist/jquery.min.js",
        }
    },

    module: {
        preLoaders: [{test: /\.ts$/, loader: 'tslint-loader', exclude: [/node_modules/, /bower_components/]}],
        loaders: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                query: {
                    'ignoreDiagnostics': [
                        2403, // 2403 -> Subsequent variable declarations
                        2300, // 2300 -> Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375  // 2375 -> Duplicate string index signature
                    ]
                },
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },

            // Support for *.json files.
            {test: /\.json$/, loader: 'json-loader'},

            // Support for CSS as raw text
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            //{ test: /\.css$/,   loader: 'raw-loader' },

            // support for .html as raw text
            {test: /\.html$/, loader: 'raw-loader'}

            // if you add a loader include the resolve file extension above
        ]
    },

    plugins: [
        new CommonsChunkPlugin(
            {name: 'vendor', filename: 'vendor.bundle.js'/*, minChunks: Infinity*/}
            // {filename: 'init.bundle.js', minChunks: Infinity}
        ),
        // static assets
        new CopyWebpackPlugin([
            {from: 'src/assets', to: 'assets'}
        ]),
        // generating html
        new HtmlWebpackPlugin({template: 'src/index.html', inject: false}),
        // replace
        new DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV),
                'NODE_ENV': JSON.stringify(metadata.ENV)
            }
        }),
        new ResolverPlugin(
            new ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ),
        new ExtractTextPlugin("[name].css", {
            disable: false,
            allChunks: true
        }),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],

    // Other module loader config
    tslint: {
        emitErrors: false,
        failOnHint: false
    },
    // our Webpack Development Server config
    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: {aggregateTimeout: 300, poll: 1000}
    },
    // we need this due to problems with es6-shim
    node: {
        global: 'window',
        progress: false,
        crypto: 'empty',
        module: false,
        clearImmediate: false,
        setImmediate: false
    }
};

// Helper functions

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}

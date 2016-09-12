var Webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: [
		'./voting-client/src/index.js'
	],
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
	plugins: [
    	new HtmlWebpackPlugin({
        	template: __dirname + '/index.html',
        	filename: 'index.html',
        	inject: 'body'
    	}),
    	new Webpack.DefinePlugin({
      	'process.env.NODE_ENV': JSON.stringify('production')
    	})
	]

};

var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./voting-client/src/index.js',
		'server.js'
	],
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "react-hot!babel-loader"}
        ]
    },
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins: [
    	new HtmlWebpackPlugin({
        	template: __dirname + '/index.html',
        	filename: 'index.html',
        	inject: 'body'
    	}),
		new webpack.HotModuleReplacementPlugin()
	]

};

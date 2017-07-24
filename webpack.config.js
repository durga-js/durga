'use strict';


const path = require('path');

module.exports = {
	entry: {
		'client/index': './lib/client/index.js'
	},

	output: {
		path: path.resolve('./'),
		filename: '[name].js',
		library: 'Durga',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	},
	devtool: false
}

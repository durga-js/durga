'use strict';


const path = require('path');

module.exports = {
	entry: {
		'client/index.js': './lib/client/index.js'
	},

	output: {
		path: path.resolve('./'),
		filename: '[name].js'
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

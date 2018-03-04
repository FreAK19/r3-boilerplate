/*  eslint-disable  */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

//  development config

module.exports = {

	mode: "development", // webpack 4 mode dev

	output: {
		filename: 'public/[name].bundle.js',
		publicPath: ""
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				exclude: /node_modules/,
				include: /src/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
						}
					},
				]
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				include: /src/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: true
						}
					},
				]
			},
		]
	},

	// Development server

	devServer: {
		host: 'localhost',
		port: 8080,
		hot: true, // HMR enable
		open: true, //  open in browser
		historyApiFallback: true, //  fallback for HTML5 History API
		overlay: {
			errors: true,
			warnings: true
		},
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
	},

	plugins: [

		//  ignore files that non-watching

		new webpack.WatchIgnorePlugin([
			path.join(__dirname, 'node_modules')
		]),
		new WebpackNotifierPlugin({ title: 'Webpack' }),  //  // webpack notify on build status
		new webpack.HotModuleReplacementPlugin(), //  Hot-Module-Replacement enable

		// web-dev-server html extract in memory

		new HtmlWebpackPlugin({
			inject: true,
			template: './index.html',
			minify: false,
			favicon: './src/favicon.ico'
		})
	]
};

/*  eslint-disable  */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
	mode: "production", //  webpack 4 mode production
	devtool: "source-map", // source-maps enable
	output: {
		filename: 'js/[name].[hash:6].js', // filename for entry
		chunkFilename: 'js/[name].[chunkhash:6].js', // filename for chunks
		publicPath: "" // public path root/
	},

	stats: {
		chunks: false,
		reasons: true,
		colors: true,
		timings: true
	},

	module: {
		rules: [
			//  operate css files

			{
				test: /\.css$/,
				exclude: /node_modules/,
				include: /src/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: false,
								minimize: true
							}
						},
						{
							loader: "postcss-loader",
							options: {
								plugins: [
									require('postcss-flexbugs-fixes'),
									require('autoprefixer'),
									require('cssnano')({
										preset: ['default', {
											discardComments: {
												removeAll: true,
											},
										}]
									}),
								]
							}
						}
					],
					publicPath: '../'
				})
			},

			//  operate less files

			{
				test: /\.less$/,
				exclude: /node_modules/,
				include: /src/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: false,
								minimize: true
							}
						},
						{
							loader: "postcss-loader",
							options: {
								plugins: [
									require('autoprefixer'),
									require('postcss-flexbugs-fixes'),
									require('cssnano')({
										preset: ['default', {
											discardComments: {
												removeAll: true,
											},
										}]
									}),
								]
							}
						},
						'less-loader',
					],
					fallback: 'style-loader',
					publicPath: '../'
				})
			}
		]
	},
	// webpack 4 options

	optimization: {
		minimize: true, //  minimize
		//  minimizer: [new UglifyWebpackPlugin()],
		runtimeChunk: { //  file manifest
			name: 'manifest'
		},
		splitChunks: {  //  code splitting
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
					name: "vendor",
					minChunks: 3,
					enforce: true
				}
			}
		}
	},

	performance: {
		hints: "warning", // "error" or false are valid too
		maxEntrypointSize: 50000, // in bytes, default 250k
		maxAssetSize: 450000, // in bytes
	},

	plugins: [
		new WebpackCleanupPlugin(), //  clear build folder
		new WebpackNotifierPlugin({ title: 'Webpack' }), // webpack notify on build status

		//  extract html file

		new HtmlWebpackPlugin({
			inject: true,
			minify: { removeAttributeQuotes: true },
			template: './index.html',
			hash: true,
			favicon: './src/favicon.ico',
		}),

		//  extract styles
		new ExtractTextPlugin({
			filename: './css/[name].[hash:6].css',
			allChunks: true
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new BundleAnalyzerPlugin() // unalize bundle file
	]
};

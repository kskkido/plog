module.exports = {
	entry: './client/index.jsx',
	output: {
		path: __dirname + '/client/public',
		filename: 'bundle.js'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx', '.json', '*']
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel-loader',
			options: {
				presets: ['react', 'es2015']
			}
		}]
	}
}

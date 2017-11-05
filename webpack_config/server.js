const { root } = require('../'),
      { join } = require('path'),
      nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: join(root, `/server/index.js`),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: join(root, 'app/server'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
		extensions: ['.js', '.jsx', '.json', '*'],
	},
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env']
        }
      },
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          name: 'public/media/[name].[ext]',
          emit: false
        }
      },
      {
        test: /\.css$/,
        use: ['css-loader/local']
      }
    ]
  }
}

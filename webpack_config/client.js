const { root } = require('../')
const { join } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('/public/[name].bundle.css')

const CLIENT = join(root, 'client')

module.exports = {
  entry: [join(CLIENT, 'index.tsx')],
  output: {
    path: join(root, 'app/public'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      Data: join(CLIENT, 'data'),
      HOC: join(CLIENT, 'components/Hoc'),
      Reducer: join(CLIENT, 'reducer'),
      Util: join(CLIENT, 'util')
    },
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '*'],
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
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    extractCSS
  ]
}

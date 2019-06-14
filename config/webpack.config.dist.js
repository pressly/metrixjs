/* eslint no-console: 0, no-undef: 0 */
const path = require('path')
const webpack =require( 'webpack')
const { ROOT_PATH, SRC_PATH } = require( './constants')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports= {
  entry: {
    'metrix': path.join(SRC_PATH, 'index.js')
    // uncomment the below line if you need to release it for web with babel-polyfill
    // we can't run both these entries together. we have to run one at the time.
    //'metrix-web': path.join(SRC_PATH, 'web.js')
  },
  mode:'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'metrixjs'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      'process.env': JSON.stringify(process.env)
    })
  ]
}
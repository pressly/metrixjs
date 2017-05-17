/* eslint no-console: 0, no-undef: 0 */
import path from 'path'
import webpack from 'webpack'
import { ROOT_PATH, SRC_PATH } from './constants'

const config = {
  entry: {
    metrix: path.join(SRC_PATH, 'index.js'),
    'metrix-with-polyfill': [
      'babel-polyfill', 
      path.join(SRC_PATH, 'index.js')
    ]
  },

  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      'process.env': JSON.stringify(process.env)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      mangle: true,
      minimize: true
    })
  ]
}

// Dist webpack config is to compile source to dist/
config.build = () => {
  const compiler = webpack(config)
  compiler.run((err) => {
    if (err) {
      throw err
    }
  })
}

export default config

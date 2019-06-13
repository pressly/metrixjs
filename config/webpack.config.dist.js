/* eslint no-console: 0, no-undef: 0 */
import path from 'path'
import webpack from 'webpack'
import { ROOT_PATH, SRC_PATH } from './constants'

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
  entry: {
    'metrix': path.join(SRC_PATH, 'index.js'),
    // uncomment the below line if you need to release it for web with babel-polyfill
    // we can't run both these entries together. we have to run one at the time.
    //'metrix-web': path.join(SRC_PATH, 'web.js')
  },

  output: {
    path: './dist',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'metrixjs'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        },
        comments: false,
        mangle: true
      }
    })]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      'process.env': JSON.stringify(process.env)
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

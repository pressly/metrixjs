import webpack from 'webpack'

import path from 'path'

console.log('====>', process.cwd())

// var configDir = path.join(process.cwd())
// var webpackConfig
// if process.env.NODE_ENV == "production" {
//   webpackConfig
// }

const config = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'metrix.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      // mangle: true,
      minimize: true
    })
  ]
}

export default config

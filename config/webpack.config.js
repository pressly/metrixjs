import webpack from 'webpack'

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

// Default webpack config is to start the dev server
config.build = () => {
  console.log('starting dev server')
}

export default config

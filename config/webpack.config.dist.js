import webpack from 'webpack'

const config = {
  entry: './app/index.js',
  output: {
    path: './dist',
    filename: 'app.js'
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

// Dist webpack config is to compile source to dist/
config.build = () => {
  console.log('build production dist')
}

export default config

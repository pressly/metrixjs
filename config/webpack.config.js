/* eslint no-console: 0, no-undef: 0 */
const path= require( 'path')
const webpack =require( 'webpack')
const WebpackDevServer =require( 'webpack-dev-server')
const HTMLWebpackPlugin= require( 'html-webpack-plugin')
const colors= require( 'colors/safe')
const { ROOT_PATH, SRC_PATH }= require( './constants')

const DEV_HOST = '0.0.0.0'
const DEV_PORT = '4000'
const PUBLIC_PATH = `http://${DEV_HOST}:${DEV_PORT}`

module.exports= {
  entry: getEntry(),
  mode:'development',
  output: {
    path: '/',
    filename: 'app.js',
    publicPath: PUBLIC_PATH
  },

  resolve: {
    unsafeCache: true,
    modules: ['metrix', 'node_modules'],
    alias: {
      'metrix': SRC_PATH
    }
  },
  
  module: {
    rules: [{
      test: /\.js$/,
      include: SRC_PATH,
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
    }),
    new HTMLWebpackPlugin({
      template: path.join(SRC_PATH, 'debug/index.html'),
      filename: 'index.html',
      hash: true
    })
  ],

  devServer: {
    hot: false,
    contentBase: false,
    quiet: false,
    noInfo: false,
    stats: {
      assets: true,
      version: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: true
    }
  }
}

function getEntry() {
  const entry = {
    app: ['babel-polyfill', path.join(SRC_PATH, 'debug/index.js') ]
  }
  entry.app.unshift(`webpack-dev-server/client?${PUBLIC_PATH}`)
  return entry
}
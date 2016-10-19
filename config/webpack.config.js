/* eslint no-console: 0, no-undef: 0 */
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import colors from 'colors/safe'
import { ROOT_PATH, SRC_PATH } from './constants'

const DEV_HOST = '0.0.0.0'
const DEV_PORT = '3000'
const PUBLIC_PATH = `http://${DEV_HOST}:${DEV_PORT}`

const config = {
  entry: getEntry(),

  output: {
    path: '/',
    filename: 'app.js',
    publicPath: PUBLIC_PATH
  },

  resolve: {
    unsafeCache: true,
    root: 'metrix',
    alias: {
      'metrix': SRC_PATH
    }
  },
  
  module: {
    loaders: [{
      test: /\.js$/,
      include: SRC_PATH,
      exclude: /node_modules/,
      loader: 'babel-loader' 
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
    app: [ path.join(SRC_PATH, 'debug/index.js') ]
  }
  entry.app.unshift(`webpack-dev-server/client?${PUBLIC_PATH}`)
  return entry
}

//--

// Default webpack config is to start the dev server
config.build = () => {
  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler, config.devServer)
  server.listen(DEV_PORT, DEV_HOST, () => {
    console.log(colors.green(`Webpack dev server listening ${DEV_HOST}:${DEV_PORT}`))
  })
}

export default config

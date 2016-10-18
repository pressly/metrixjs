/* eslint no-console: 0, no-undef: 0 */
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import colors from 'colors/safe'

const ROOT_PATH = path.join(__dirname, '..')
const SRC_PATH = path.join(ROOT_PATH, 'src')
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
    root: 'app',
    alias: {
      'app': SRC_PATH
    }
  },
  
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: SRC_PATH,
        exclude: /node_modules/,
        loader: 'babel-loader' 
      }
    ]
  },
  
  plugins: [
    new HTMLWebpackPlugin({
      title: 'metrixjs test app',
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
    app: [ path.join(SRC_PATH, 'index.js') ]
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

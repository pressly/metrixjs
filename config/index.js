/* eslint no-undef: 0 */
import webpackConfigDefault from './webpack.config'
import webpackConfigDist from './webpack.config.dist'
import webpackConfigUmdDist from './webpack.config.umd.dist'

const config = {}
if (process.env.NODE_ENV == 'production') {
  config.webpack = {
    build: function () {
      webpackConfigDist.build()
      webpackConfigUmdDist.build()
    }
  }
} else {
  config.webpack = webpackConfigDefault
}

export default config

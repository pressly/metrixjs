/* eslint no-undef: 0 */
import webpackConfigDefault from './webpack.config'
import webpackConfigDist from './webpack.config.dist'

const config = {}
if (process.env.NODE_ENV == 'production') {
  config.webpack = webpackConfigDist
} else {
  config.webpack = webpackConfigDefault
}

export default config

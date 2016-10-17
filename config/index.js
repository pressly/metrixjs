/* eslint no-undef: 0 */

// well.. this will work..

import webpackConfigDefault from './webpack.config'
import webpackConfigDist from './webpack.config.dist'

let config 
if (process.env.NODE_ENV == 'production') {
  config = {...webpackConfigDist}
  config.build = () => {
    console.log('=> build me.. prod', config)
  }
} else {
  config = {...webpackConfigDefault}
  config.build = () => {
    console.log('=> build me..', config)
  }
}

export default config

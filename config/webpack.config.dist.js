const config = {
  x: 1
}

// Dist webpack config is to compile source to dist/
config.build = () => {
  console.log('build production dist')
}

export default config

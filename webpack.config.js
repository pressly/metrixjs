
module.exports = {
    entry: './src/index.js',
    output: {
        path: './dist',
        filename: 'metrix.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    }
}

// export default config

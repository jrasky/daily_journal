const webpack = require('webpack');

module.exports = {
    entry: [
        'babel-polyfill',
        'webpack-hot-middleware/client',
        'react-hot-loader/patch',
        __dirname + '/src/app.js'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
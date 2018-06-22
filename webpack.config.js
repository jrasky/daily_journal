module.exports = {
    mode: 'production',
    entry: [
        __dirname + '/src/app.tsx'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        moment: 'moment',
        immutable: 'Immutable'
    }
};
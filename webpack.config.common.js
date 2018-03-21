const path = require('path');
const WebpackStripLoader = require('strip-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/bundle.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: WebpackStripLoader.loader('console.error')
                    },
                    {
                        loader: path.resolve('lib/webpack-loader.js')
                    }
                ],

            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
            uglifyOptions: {
                mangle: {
                    // Works around a Safari 10 bug:
                    // https://github.com/mishoo/UglifyJS2/issues/1753
                    safari10: true,
                },
            },
        }),
        new ProgressBarPlugin()
    ],
    devServer: {
        port: 8080,
        historyApiFallback: true,
        hot: false
    }
};
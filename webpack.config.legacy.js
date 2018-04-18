const path = require('path');
const WebpackStripLoader = require('strip-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        bundle: './src/bundle.legacy.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].legacy.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    'env',
                                    {
                                        modules: false,
                                        useBuiltIns: true,
                                        targets: {
                                            browsers: [
                                                'last 2 IE versions', 'not IE < 11'
                                            ],
                                        },
                                        debug: true
                                    }
                                ]
                            ],
                            compact: true
                        }
                    },
                    {
                        loader: WebpackStripLoader.loader('console.error')
                    }
                ],

            },
            {
                test: /\.css$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                    }
                ]
            }
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new UglifyJSPlugin({
            sourceMap: true,
            uglifyOptions: {
                mangle: {
                    // Works around a Safari 10 bug:
                    // https://github.com/mishoo/UglifyJS2/issues/1753
                    safari10: true,
                },
            },
        })
    ],
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        historyApiFallback: true,
        hot: false
    }
};
const path = require('path');
const WebpackStripLoader = require('strip-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app: './src/bundle.js'
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
                        loader: WebpackStripLoader.loader('console.log')
                    }
                ],

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
    ]
};
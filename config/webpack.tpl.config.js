const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: resolve(__dirname, '../template/src/index.js'),
    output: {
        path: resolve(__dirname, '/tpl'),
        filename: 'index.js'
    },
    resolveLoader: {
        modules: [resolve(__dirname, '../modules') , resolve(__dirname, '../node_modules') ]
    },
    module: {
        rules:[
            {
                test: /\.tpl$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'tpl-loader',
                        options: {
                            log: true
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        port: 5052
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, '../template/index.html')

        })
    ]
}
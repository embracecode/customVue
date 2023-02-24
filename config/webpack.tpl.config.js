const { resolve, join } = require('path')
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
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        port: 5052,
        contentBase: [resolve(__dirname, '../template/assets')]
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, '../template/index.html')

        })
    ]
}
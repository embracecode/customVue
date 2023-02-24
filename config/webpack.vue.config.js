const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: resolve(__dirname, '../main.js'),
    output: {
        filename: 'main.js',
        path: resolve(__dirname, '/dist')
    },
    resolveLoader: {
        modules: [resolve(__dirname, '../node_modules') , resolve(__dirname, '../modules')]
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /.vue$/i,
                loader: 'vue-loader'
            }
        ]
    },
    devServer: {
        port: 5051
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, '../public/index.html')
        })
    ]
}
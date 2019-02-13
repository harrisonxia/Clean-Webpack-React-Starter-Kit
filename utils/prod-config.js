const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devConfig = require('./dev-config')

const public_url = ''
module.exports = {
    context: devConfig.context,
    entry: {
        'app': './index.jsx',
    },
    output: {
        path: path.resolve(__dirname, '../../docs/'),
        filename: 'app.[hash].js',
    },
    devtool: 'cheap-module-source-map',
    resolve: devConfig.resolve,
    module: devConfig.module,
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                BROWSER: true,
                NODE_ENV: JSON.stringify('production'),
                PUBLIC_URL: JSON.stringify(public_url),
            },
        }),
        new ExtractTextPlugin({filename: '[name].[hash].css', allChunks: true}),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: './index.html',
            inject: true,
        }),
        new CopyWebpackPlugin([
            {from: 'assets/img', to: 'assets/img'},
            // {from: './favicon.ico', to: './favicon.ico'},
        ]),
    ],
}

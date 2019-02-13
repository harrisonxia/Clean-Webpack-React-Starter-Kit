var path = require('path')
var webpack = require('webpack')
const BabelFlowWebpackPlugin = require('babel-flow-webpack-plugin')
var devPort = 4000
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const global_css_vars = require('./global-css-vars.js')
const autoPrefixer = require('autoPrefixer')
const customProperties = require('postcss-custom-properties')
const customPropertiesPlugin = customProperties()
var CopyWebpackPlugin = require('copy-webpack-plugin')
customPropertiesPlugin.setVariables(global_css_vars)


module.exports = {
    context: path.resolve(__dirname, '..', 'src'),
    entry: {
        'dev-server': 'webpack-dev-server/client?http://localhost:' + devPort,
        'app': './index.jsx'
    },

    output: {
        path: '/',
        publicPath: 'http://localhost:' + devPort + '/',
        filename: '[name].[hash].js',
    },

    resolve: {
        modules: [
            path.resolve(__dirname, '../src'),
            'node_modules'
        ],
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.js|\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options:
                    {
                        cacheDirectory: true,
                        plugins: ['react-hot-loader/babel']
                    }
            },
            {
                test: /\.css$/,
                exclude: /\.useable\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: true,
                                localIdentName:
                                    '[name]__[local]__[hash:base64:5]',
                                minimize: false,
                                modules: true,
                                sourceMap: true,
                            }
                        },
                        {
                            loader: 'csso-loader',
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: [
                                    customPropertiesPlugin,
                                    autoPrefixer(),
                                ],
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            },
            {
                test: /\.(json)$/,
                loader: 'json-loader'
            },
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: true,
                NODE_ENV: JSON.stringify("development"),
                PUBLIC_URL: JSON.stringify(''),
            },
        }),
        new ExtractTextPlugin({filename: '[name].[hash].css', allChunks: true}),
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            inject: true,
        }),
        new BabelFlowWebpackPlugin(),
        new CopyWebpackPlugin([
            {from:'assets/img',to:'assets/img'},
        ]),
    ],
    devtool: 'inline-source-map',
    devServer: {
        port: devPort,
        contentBase: 'src/',
        headers: {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Credentials": "true"},
        proxy: {
            '/**/app.js': {
                target: 'http://localhost:' + devPort,
            }
        },
        inline: true,
        historyApiFallback: true
    }

}


const path = require("path");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin")
const WebpackShellPlugin = require('webpack-shell-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { join, resolve } = require('path');
module.exports = {
    // entry: [join(__dirname, '/frontend/src/js/app.js')],
    entry: ['babel-polyfill', join(__dirname, '/frontend/src/js/app.js')],
    output: {
        filename: 'bundle.js',
        path:join(__dirname, "static/dist")
    },
    module: {
        rules:[
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options:{
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {

                test: /\.(eot|ttf|woff|woff2|otf)$/i,
                use: [
                    {
                        //loader: 'file-loader',
                        loader: 'url-loader?limit=100000',
                        options: {}
                    }
                ]
            },

            {
                test: /\.(png|jp(e*)g|svg|gif)$/i,
                use: [

                    'file-loader?name=/static/public/images/LoginImg/[name].[ext]'

                ],
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
        ]
    },
    optimization:{
        splitChunks:{
            chunks:'all',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:path.join(__dirname, "frontend/src", "index.html")
        }),
        new CompressionPlugin({ // gzip js and css test: /\.(js|css)/
        }),
        new UglifyJsPlugin(),
        new Dotenv({
            path: './frontend/.env.dev',
        })
    ]
    // devServer: {
    //     contentBase: resolve(__dirname, "/frontend/src"),
    //     historyApiFallback: true
    // },
};


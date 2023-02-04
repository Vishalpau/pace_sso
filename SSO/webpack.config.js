const { join, resolve } = require('path');
const Dotenv = require('dotenv-webpack');
console.log(__dirname)
module.exports = {
    entry: ['babel-polyfill', join(__dirname, '/frontend/src/js/app.js')],
    output: {
        filename: 'bundle.js',
        path: join(__dirname, '/static/public/js/'),
        // publicPath: "/static/public/images/"
    },
    devServer: {
        contentBase: resolve(__dirname, "/frontend/src"),
        historyApiFallback: true
    },
    // new HtmlWebpackPlugin({
    //     favicon: "./src/favicon.gif"
    // })
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                // use: [
                //     { loader: 'style-loader' },
                //     { loader: 'css-loader',
                //         options: {
                //             modules: true
                //         }
                //     },
                // ],
                // exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
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

        ]
    },
    plugins: [
        new Dotenv({
            path: './frontend/.env.dev',
        })
    ]

} 
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'App.jsx'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new ExtractTextPlugin({
              filename: 'style-[contenthash].css',
              disable: false,
              allChunks: false, // true
            })
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css/,
                use: [
                {
                    loader: "style-loader"
                },
                {
                    loader: "css-loader",
                    options: {
                        modules: true,
                        localIdentName: '[local]___[hash:base64:5]'
                    }
                },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader",
                        options: {
                            localIdentName: '[local]___[hash:base64:5]'
                        }// translates CSS into CommonJS
                    }, {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        } // compiles Less to CSS
                    }
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public')
    },
    mode: 'development'
};

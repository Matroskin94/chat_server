const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PRODUCTION_MODE = process.env.NODE_ENV.trim() === 'production';

module.exports = {
    entry: path.join(__dirname, 'src', 'App.jsx'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new Dotenv(),
        new ExtractTextPlugin({
            filename: 'style-[contenthash].css',
            disable: false,
            allChunks: false, // true
        }),
        new MiniCssExtractPlugin({
            filename: './style.[contenthash].css',
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    node: {
        fs: 'empty'
    },
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
                // MiniCssExtractPlugin.loader,
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
                    },
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            localIdentName: '[local]___[hash:base64:5]'
                        }// translates CSS into CommonJS
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        } // compiles Less to CSS
                    }
                ]
            },
            {
                test: /\.mp3$/,
                include: path.join(__dirname, 'src', 'assets'),
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public')
    }
};

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'docs')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-preset-env']]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                resourceQuery: /raw/,
                type: 'asset/source'
            },
            {
                test: /\.png/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.svg/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[hash][ext][query]'
                }
            },
            {
                test: /\.(ttf|otf)$/i,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[id].[contenthash].css'
        }),

        // Index
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/library/aromalibrary.html',
            filename: './pages/library/aromalibrary.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/longread/longread.html',
            filename: './pages/longread/longread.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/entertainments/bingo.html',
            filename: './pages/entertainments/bingo.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/about_us/about_us.html',
            filename: './pages/about_us/about_us.html'
        }),
        // Article
        // new HtmlWebpackPlugin({
        //   template: './src/articles/superorganisms/S_Popup.html',
        //   filename: './superorganisms/S_Popup.html'
        // }),

        // Partials
        new HtmlWebpackPartialsPlugin([
            {
                path: path.join(__dirname, './src/index.html'),
                location: 'analytics',
                template_filename: '*',
                priority: 'replace'
            }
        ]),
        new HtmlWebpackPartialsPlugin([
            {
                path: path.join(__dirname, './src/partials/footer.html'),
                location: 'footer',
                template_filename: '*',
                priority: 'replace'
            }
        ]),
        new HtmlWebpackPartialsPlugin([
            {
                path: path.join(__dirname, './src/partials/header.html'),
                location: 'header',
                template_filename: '*',
                priority: 'replace'
            }
        ])
    ],
    optimization: {
        minimizer: [new CssMinimizerPlugin()]
    },

    stats: {
        children: true
    }
};
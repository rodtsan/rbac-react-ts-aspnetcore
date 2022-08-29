const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const paths = require('./paths');
const Dotenv = require('dotenv-webpack');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const PORT = process.env.PORT || 3000;

module.exports = {
    entry: paths.appIndexJs,
    context: paths.appSrc,
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpe?g|png|gif|ico|svg)$/i,
                exclude: /node_modules/,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]',
                    'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: paths.appHtml
        }),
        new Dotenv()
    ],
    devServer: {
        static: {
            directory: paths.appPublic
        },
        compress: true,
        port: PORT
    },
    stats: 'errors-only',
    resolve: {
        alias: {
            '@src': paths.appSrc,
            '@components': path.join(paths.appSrc, './components/'),
            '@common': path.join(paths.appSrc, './common/'),
            '@pages': path.join(paths.appSrc, './pages/'),
            '@assets': path.join(paths.appSrc, './assets/'),
            '@settings': path.join(paths.appSrc, './settings/'),
            '@store': path.join(paths.appSrc, './store/'),
        },
        extensions: ['', '.js', '.ts', '.tsx']
    }
};

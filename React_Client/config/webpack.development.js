const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const paths = require('./paths');

module.exports = merge(commonConfig, {
    mode: 'development',
    output: {
        filename: 'js/bundle.[contenthash].min.js',
        path: paths.publicPath,
        publicPath: '/',
        clean: true
    },
    devServer: {
        open: true,
        // hot: true, // enable HMR on the server
        historyApiFallback: true, // fixes error 404-ish errors when using react router :see this SO question: https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url,
    },
    devtool: 'source-map',
    plugins: [new ReactRefreshPlugin()]
});

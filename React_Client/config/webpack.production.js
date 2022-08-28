const { merge } = require('webpack-merge');
const { resolve } = require('path');
const paths = require('./paths');

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'production',
    output: {
        filename: 'js/bundle.[contenthash].min.js',
        path: paths.appBuild,
        publicPath: '/',
        clean: true
    },
    devtool: 'source-map',
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM'
    }
});

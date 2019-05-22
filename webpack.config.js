const MinifyPlugin = require('babel-minify-webpack-plugin');
const config = {
    context: __dirname + '/src',
    entry: {
        app: './slider.js',
    },
    output: {
        path: __dirname + '/public/js/slider-currency',
        filename: 'slider.min.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: __dirname + '/node_modules',
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        }, {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        }, {
            test: /\.(ttf|woff|eot|svg)/,
            use: 'base64-inline-loader?limit=1000',
        }],
    },
    plugins: [
        new MinifyPlugin()
    ],
};
module.exports = config;

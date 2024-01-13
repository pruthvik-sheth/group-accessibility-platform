const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new Dotenv({
            path: path.join(__dirname, '../local/.env.development')
        })
    ],
    devtool: 'inline-source-map',
    devServer: {
        port: 8080,
        open: true,
        watchFiles: ['components/', 'Experience/', 'root/app.jsx', 'routers/client/', 'states/', 'styles/', 'utils/'],
        proxy: {
            // '/api': 'http://[::1]:3000'
            '/api': 'http://localhost:3000/',
            '/socket': 'http://localhost:3000/'
        },
        static: {
            directory: path.join(__dirname, '../../public'),
            publicPath: '/'
        },
        historyApiFallback: true
    }
})
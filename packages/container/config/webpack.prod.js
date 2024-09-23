const { merge } = require('webpack-merge')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJSON = require('../package.json')

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/container/latest/'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: `marketing@${process.env.PRODUCTION_DOMAIN}/marketing/remoteEntry.js`
      },
      shared: packageJSON.dependencies
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)

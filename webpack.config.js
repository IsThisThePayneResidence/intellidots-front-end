'use strict'

let path = require('path')
let webpack = require('webpack')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

let plugins = [
  new webpack.ProvidePlugin({
    $: 'jquery'
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    },
    '__DEV__': JSON.stringify(process.env.NODE_ENV === 'development')
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }))
}

module.exports = {
  entry: {
    vendor: [
      'jquery',
      'classnames',
      'lodash',
      'material-ui',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'react-tap-event-plugin',
      'redux',
    ],
    bundle: './src/ts/bootstrap.tsx'
  },
  output: {
    path: path.join(__dirname, 'dist/public/js'),
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '../../../[resource-path]',
    devtoolFallbackModuleFilenameTemplate: '../../../[resource-path]?[hash]'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.webpack.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  ts: {
    silent: true
  }
}
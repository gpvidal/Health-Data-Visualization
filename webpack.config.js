const path = require('path');

module.exports = {
  entry: path.resolve('www', 'index.js'),
  output: {
    path: path.resolve('www', 'public', 'js'),
    filename: 'app_bundle.js'
  },
  module: {
    loaders: [
      { test: path.resolve('www'), loader: 'babel-loader', exclude: /node_modules/ }      
    ]
  }
}
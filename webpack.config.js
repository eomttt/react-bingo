const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js']
  },

  entry: {
    app: ['./index']
  },
  module: {
    rules: [{
      test: /\.js?$/, 
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 5% in KR', 'last 2 chrome versions'],
            }
          }], 
          '@babel/preset-react'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-hot-loader/babel'
          ] 
      },
    },{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }]
  }, 
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ], 
  output: {
    filename: 'app.js',

  }, 
};

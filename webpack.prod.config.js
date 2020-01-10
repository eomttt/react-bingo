const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: {
    app: ['./index']
  },
  module: {
    rules: [{
      test: /\.jsx?$/, 
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
      debug: false
    }),
  ], 
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist')
  }, 
};

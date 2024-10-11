const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './example/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        type: 'asset/source'
      },
      {
        test: /\.bpmn$/,
        type: 'asset/source'
      }
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '*.{html,css}', context: 'example', to: '.' },
        { from: 'bpmn-js/dist/assets/**/*', context: 'node_modules', to: './vendor' },
        { from: '*.css', context: 'colors', to: './vendor/bpmn-js-color-picker' }
      ],
    }),
  ],
  devtool: 'eval-source-map'
};
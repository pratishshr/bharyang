var path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [{ test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bharyang.js',
    library: 'bharyang',
    libraryTarget: 'umd'
  }
};

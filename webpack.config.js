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
    filename: 'lib.js',
    library: 'lib',
    libraryTarget: 'umd'
  }
};

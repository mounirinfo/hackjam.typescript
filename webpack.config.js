const path = require('path');

module.exports = {
  entry: {
    '01_intro': './test/01_intro.test.ts',
    '02_array': './test/02_array.test.ts'
  },
  output: {
    filename: '[name].test.js',
    path: path.join(__dirname, 'dist/test'),

  },
  resolve: {
    extensions: ["", ".ts", ".js"],
  },
  devtool: "eval-source-map",
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  }
};

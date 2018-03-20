const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'my-first-webpack.bundle.js'
  }
};
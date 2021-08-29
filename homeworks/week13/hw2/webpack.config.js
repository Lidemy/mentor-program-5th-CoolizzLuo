const path = require('path')

module.exports = {
  // development, production
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'commentsPlugin'
  }
}

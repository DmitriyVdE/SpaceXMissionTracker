const path = require('path')
const Dotenv = require('dotenv-webpack');

const {
  NODE_ENV = 'production',
} = process.env;

module.exports = {
  target: "node",
  entry: './src/index.js',
  mode: NODE_ENV,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  resolveLoader: {
    modules: [
      __dirname + '/node_modules'
    ]
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, './.env')
    })
  ]
}
const path = require('path')

const ENTRY = __dirname + '/client/src';
const OUTPUT = __dirname + '/client/dist';

module.exports = {
  mode: 'development',
  entry: ENTRY + `/index.js`,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: ENTRY,
        exclude: [/node_modules/, path.resolve(__dirname, "node_modules")],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  },
  output: {
    path: OUTPUT,
    filename: 'bundle.js'
  }
}
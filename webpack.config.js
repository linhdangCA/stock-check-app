const path = require('path')

module.exports = {
  mode: 'development',
  entry: `${__dirname}/client/src/index.js`,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: `${__dirname}/client/src`,
        exclude: [/(node_modules)/, path.resolve(__dirname, "node_modules")],
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
    path: `${__dirname}/client/dist`,
    filename: 'bundle.js'
  }
}
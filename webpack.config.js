const path = require('path');

module.exports = {
  mode : process.env.NODE_ENV,
  entry : path.resolve(__dirname, 'client/index.js'),
  devServer : {
    publicPath : '/build/',
  },
  output : {
    path : path.resolve(__dirname, 'build'),
    filename : 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
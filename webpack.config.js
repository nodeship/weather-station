const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app:'./src/index.js',
    styles:'./src/styles.css'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  stats: { children: false },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    hot: true,
    writeToDisk: true,
    port: 3333,
    contentBase: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Weather Station',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
    }),
    new CopyWebpackPlugin([{
      from: "./src/assets/**/*",
      to: "assets",
      flatten: true
    }])
 ]

}
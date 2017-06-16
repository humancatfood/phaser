const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');



const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};


const common = {

  entry: {
    app: path.join(PATHS.src, 'index.js'),
    vendor: ['pixi', 'p2', 'phaser']
  },

  output: {
    path: PATHS.build,
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /pixi\.js/,
        use: 'expose-loader?PIXI'
      },
      {
        test: /phaser\.js/,
        use: 'expose-loader?Phaser'
      },
      {
        test: /p2\.js/,
        use: 'expose-loader?p2'
      }
    ]
  },

  resolve: {
    alias: {
      'phaser': require.resolve('phaser/build/phaser'),
      'pixi': require.resolve('phaser/build/pixi'),
      'p2': require.resolve('phaser/build/p2')
    }
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.ejs'),
      hash: true
    })
  ]
};


const development = {
  devtool: 'source-map',
  devServer: {
    contentBase: PATHS.src,
    historyApiFallback: true,
    inline: true,

    stats: 'errors-only',

    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000 ,
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: {
        DEBUG: true
      }
    })
  ]
};


const production = {
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      ENV: {
        DEBUG: false
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(PATHS.src, 'assets'),
        to: path.resolve(PATHS.build, 'assets')
      }
    ])
  ]
};


switch (process.env.npm_lifecycle_event)
{

  case 'build':

    process.env.BABEL_ENV = 'build';
    module.exports = merge(common, production);
    break;

  default:

    process.env.BABEL_ENV = 'development';
    module.exports = merge(common, development);

}



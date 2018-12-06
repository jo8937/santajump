var path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

config = {
  entry: './src/santa/game.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' },
      { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/build/',
    host: '127.0.0.1',
    port: 3002,
    open: true
  },  
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser
    }
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    console.log("...dev mode...")
    config.devtool = "eval-source-map";
  }

  if (argv.mode === 'production') {
    console.log("...Production mode...")
    config.optimization = {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    }
                },
                extractComments: true, // /(?:^!|@(?:license|preserve))/i
            })
        ]
    };
  }  

  return config;
}
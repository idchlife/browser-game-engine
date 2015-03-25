var config = {
  entry: './app.src.js',
  output: {
    path: __dirname,
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};

module.exports = config;
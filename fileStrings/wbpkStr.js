const webCommon = `const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            // plugins: ['react-hot-loader/babel'],
          },
        },
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(pdf)$/,
        use: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.react.js'],
  },
};
`;

const webDevelopment = `const path = require('path');
const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  plugins: [new CleanWebpackPlugin(), new HotModuleReplacementPlugin()],
  devServer: {
    contentBase: path.join(__dirname),
    // watchContentBase: true,
    liveReload: false,
    publicPath: '/build',
    hot: true,
    writeToDisk: false,
    // inline: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
`;

const webProduction = `const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  optimization: {
    minimize: true,
  },
});
`;

module.exports = {
  webCommon,
  webDevelopment,
  webProduction,
};

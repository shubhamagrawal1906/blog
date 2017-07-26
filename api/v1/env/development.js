import path from 'path';
import webpack from 'webpack';

module.exports = {
  DATABASE_URL: 'mongodb://localhost:27017/test',
  HOST: '127.0.0.1',
  PORT: 8080,
  BASE_URL: '/api/v1',
  API_SECRET_KEY: '$2a$10$/euEox.vZXMMJZ7RMn/X5OwPi4/1rc9mwAWnC7wpb4/02bFCXHS/C',
  mail: {
    HOST: 'smtp.gmail.com',
    POST: 465,
    SECURE: true,
    auth: {
      USERNAME: 'shubham199541@gmail.com',
      PASSWORD: ''
    },
    DISPLAY_NAME: '<shubham199541@gmail.com>'
  },
  page: {
    USER: 10,
    POST: 10,
    COMMENT: 10,
    CATEGORY: 10,
    TAG: 10,
    DEFAULT: 10
  },
  PRESETS: ["es2015", "stage-2", "react"],
  webpackConfig: {
    // devtools: 'eval-source-map',
    entry: [
      'webpack-dev-server/client?http://127.0.0.1:8080',
      path.join(__dirname, './../public/app/index.js')
    ],
    output: {
      path: path.join(__dirname, './../public/app'),
      publicPath: '/static/app/',
      filename: 'bundle.js',
      hotUpdateChunkFilename: 'hot/hot-update.js',
      hotUpdateMainFilename: 'hot/hot-update.json'
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: path.join(__dirname, './../public/app'),
          loaders: ['react-hot-loader', 'babel-loader']
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    }
  }
};

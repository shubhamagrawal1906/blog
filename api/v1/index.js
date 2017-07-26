import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import mongoose from 'mongoose';
import config from './config';
import AuthRoute from './routes/auth-route.js';
import PostRoute from './routes/post-route.js';
import CommentRoute from './routes/comment-route.js';
import CategoryRoute from './routes/category-route.js';
import TagRoute from './routes/tag-route.js';

let env = config();

mongoose.connect(env.DATABASE_URL);

let app = express();

const compiler = webpack(env.webpackConfig);

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: env.webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let router  = express.Router();
let authRoute = new AuthRoute(router);
router = authRoute.getRoutes;
let postRoute = new PostRoute(router);
router = postRoute.getRoutes;
let commentRoute = new CommentRoute(router);
router = commentRoute.getRoutes;
let categoryRoute = new CategoryRoute(router)
router = categoryRoute.getRoutes;
let tagRoute = new TagRoute(router)
router = tagRoute.getRoutes;
app.use(env.BASE_URL, router);

app.use('/static', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(env.PORT, () => {
  console.log("Server is running on " + "http://" + env.HOST + ":" + env.PORT)
});

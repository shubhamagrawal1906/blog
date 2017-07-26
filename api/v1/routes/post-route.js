import PostController from './../controllers/post-controller';
import Helper from './../miscellaneous/helper';
import mongoose from 'mongoose';

export default class PostRoute {

  constructor(router) {
    this.postController = new PostController();
    this.helper = new Helper();
    this.router = router;
  }

  get getRoutes() {
    this.router.get('/post/', (req, res) => { this.getAllPost(req, res) });
    this.router.get('/post/:id', (req, res) => { this.getPost(req, res) });
    this.router.post('/post/', (req, res) => { this.createPost(req, res) });
    this.router.put('/post/:id', (req, res) => { this.updatePost(req, res) });
    this.router.delete('/post/:id', (req, res) => { this.deletePost(req, res) });
    this.router.get('/post/view/:id', (req, res) => { this.updateView(req, res) });
    this.router.get('/post/like/:id', (req, res) => { this.updateLike(req, res) });
    this.router.get('/post/dislike/:id', (req, res) => { this.updateDislike(req, res) });
    return this.router;
  }


  getAllPost = (req, res) => {
    this.postController.getAllPost(req, res);
  }

  getPost = (req, res) => {
    req.body.post_id = mongoose.Types.ObjectId(req.params.id);
    this.postController.getPost(req, res);
  }

  createPost = (req, res) => {
    this.postController.createPost(req, res);
  }

  updatePost = (req, res) => {
    req.body.post_id = mongoose.Types.ObjectId(req.params.id);
    this.postController.updatePost(req, res);
  }

  deletePost = (req, res) => {
    req.body.post_id = mongoose.Types.ObjectId(req.params.id);
    this.postController.deletePost(req, res);
  }

  updateView = (req, res) => {
    req.body.post_id = mongoose.Types.ObjectId(req.params.id);
    this.postController.updateView(req, res);
  }

  updateLike = (req, res) => {
    req.body.post_id = mongoose.Types.ObjectId(req.params.id);
    this.postController.updateLike(req, res);
  }

  updateDislike = (req, res) => {
    req.body.post_id = mongoose.Types.ObjectId(req.params.id);
    this.postController.updateDislike(req, res);
  }

}

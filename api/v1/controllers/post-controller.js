import PostService from './../services/post-service';
import Controller from './controller';

export default class PostController extends Controller {

  constructor() {
    super();
    this.postService = new PostService();
  }

  getAllPost = (req, res) => {
    this.postService.getAllPost(req.body, (data) => {
      this.controller(res, data);
    });
  }

  getPost = (req, res) => {
    this.postService.getPost(req.body, (data) => {
      this.controller(res, data);
    });
  }

  createPost = (req, res) => {
    this.postService.createPost(req.body, (data) => {
      this.controller(res, data);
    });
  }

  updatePost = (req, res) => {
    this.postService.updatePost(req.body, (data) => {
      this.controller(res, data);
    });
  }

  deletePost = (req, res) => {
    this.postService.deletePost(req.body, (data) => {
      this.controller(res, data);
    });
  }

  updateView = (req, res) => {
    this.postService.updateView(req.body, (data) => {
      this.controller(res, data);
    });
  }

  updateLike = (req, res) => {
    this.postService.updateLike(req.body, (data) => {
      this.controller(res, data);
    });
  }

  updateDislike = (req, res) => {
    this.postService.updateDislike(req.body, (data) => {
      this.controller(res, data);
    });
  }

}

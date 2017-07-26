import CommentService from './../services/comment-service';
import Controller from './controller';

export default class CommentController extends Controller {

  constructor() {
    super();
    this.commentService = new CommentService();
  }

  getPostComment = (req, res) => {
    this.commentService.getPostComment(req.body, (data) => {
      this.controller(res, data);
    });
  }

  getComment = (req, res) => {
    this.commentService.getComment(req.body, (data) => {
      this.controller(res, data);
    });
  }

  createComment = (req, res) => {
    this.commentService.createComment(req.body, (data) => {
      this.controller(res, data);
    });
  }

  updateComment = (req, res) => {
    this.commentService.updateComment(req.body, (data) => {
      this.controller(res, data);
    });
  }

  deleteComment = (req, res) => {
    this.commentService.deleteComment(req.body, (data) => {
      this.controller(res, data);
    });
  }

  updateLike = (req, res) => {
    this.commentService.updateLike(req.body, (data) => {
      this.controller(res, data);
    });
  }

  updateDislike = (req, res) => {
    this.commentService.updateDislike(req.body, (data) => {
      this.controller(res, data);
    });
  }

}

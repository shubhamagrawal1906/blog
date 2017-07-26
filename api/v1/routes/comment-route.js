import CommentController from './../controllers/comment-controller';
import Helper from './../miscellaneous/helper';
import mongoose from 'mongoose';

export default class CommentRoute {

  constructor(router) {
    this.commentController = new CommentController();
    this.helper = new Helper();
    this.router = router;
  }

  get getRoutes() {
    this.router.get('/comment/post/:id', (req, res) => { this.getPostComment(req, res) });
    this.router.get('/comment/:id', (req, res) => { this.getComment(req, res) });
    this.router.post('/comment/', (req, res) => { this.createComment(req, res) });
    this.router.put('/comment/:id', (req, res) => { this.updateComment(req, res) });
    this.router.delete('/comment/:id', (req, res) => { this.deleteComment(req, res) });
    this.router.get('/comment/like/:id', (req, res) => { this.updateLike(req, res) });
    this.router.get('/comment/dislike/:id', (req, res) => { this.updateDislike(req, res) });
    return this.router;
  }

  getPostComment = (req, res) => {
    req.body.post_id = mongoose.Types.ObjectId(req.params.id);
    this.commentController.getPostComment(req, res);
  }

  getComment = (req, res) => {
    req.body.comment_id = mongoose.Types.ObjectId(req.params.id);
    this.commentController.getComment(req, res);
  }

  createComment = (req, res) => {
    req.body.post_id = mongoose.Types.ObjectId(req.body.post_id);
    this.commentController.createComment(req, res);
  }

  updateComment = (req, res) => {
    req.body.post_id = mongoose.Types.ObjectId(req.body.post_id);
    req.body.comment_id = mongoose.Types.ObjectId(req.params.id);
    this.commentController.updateComment(req, res);
  }

  deleteComment = (req, res) => {
    req.body.post_id = mongoose.Types.ObjectId(req.body.post_id);
    req.body.comment_id = mongoose.Types.ObjectId(req.params.id);
    this.commentController.deleteComment(req, res);
  }

  updateLike = (req, res) => {
    req.body.comment_id = mongoose.Types.ObjectId(req.params.id);
    this.commentController.updateLike(req, res);
  }

  updateDislike = (req, res) => {
    req.body.comment_id = mongoose.Types.ObjectId(req.params.id);
    this.commentController.updateDislike(req, res);
  }

}

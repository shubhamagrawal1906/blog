import CommentValidation from './../validations/comment-validation';
import CommentRepository from './../repositories/comment-repository';
import Service from './service';

export default class CommentService extends Service {

  constructor() {
    super();
    this.commentRepository = new CommentRepository();
    this.commentValidation = new CommentValidation();
  }

  getPostComment = (data, callback) => {
    this.commentValidation.getPostComment(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.commentRepository.getPostComment(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  getComment = (data, callback) => {
    this.commentValidation.getComment(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.commentRepository.getComment(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  createComment = (data, callback) => {
    this.commentValidation.createComment(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.commentRepository.createComment(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  updateComment = (data, callback) => {
    this.commentValidation.updateComment(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.commentRepository.updateComment(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  deleteComment = (data, callback) => {
    this.commentValidation.deleteComment(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.commentRepository.deleteComment(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  updateLike = (data, callback) => {
    this.commentValidation.updateMeta(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.commentRepository.updateLike(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  updateDislike = (data, callback) => {
    this.commentValidation.updateMeta(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.commentRepository.updateDislike(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

}

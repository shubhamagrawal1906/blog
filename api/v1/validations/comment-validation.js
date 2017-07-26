import Validation from './validation';

export default class CommentValidation extends Validation {

  constructor() {
    super();
  }

  getPostComment = (data, callback) => {
    let validator = new Object({
      'post_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  getComment = (data, callback) => {
    let validator = new Object({
      'comment_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  createComment = (data, callback) => {
    let validator = new Object({
      'content': ['required', 'string'],
      'author_id': ['reference'],
      'post_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  updateComment = (data, callback) => {
    let validator = new Object({
      'content': ['required', 'string'],
      'author_id': ['reference'],
      'post_id': ['reference'],
      'comment_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  deleteComment = (data, callback) => {
    let validator = new Object({
      'author_id': ['reference'],
      'comment_id': ['reference'],
      'post_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  updateMeta = (data, callback) => {
    let validator = new Object({
      'author_id': ['reference'],
      'comment_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

}

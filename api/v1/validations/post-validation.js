import Validation from './validation';

export default class PostValidation extends Validation {

  constructor() {
    super();
  }

  getAllPost = (data, callback) => {
    let validator = new Object({
      'author_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  getPost = (data, callback) => {
    let validator = new Object({
      'post_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  createPost = (data, callback) => {
    console.log(data);
    let validator = new Object({
      'title': ['required', 'string'],
      'article': ['required', 'string'],
      'file': ['string'],
      'banner_image': ['string'],
      'author_id': ['reference'],
      'category_id': ['reference', {'minimum': [1]}],
      'tag_id': ['reference', {'minimum': [1]}],
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  updatePost = (data, callback) => {
    let validator = new Object({
      'title': ['required', 'string'],
      'article': ['required', 'string'],
      'file': ['string'],
      'banner_image': ['string'],
      'author_id': ['reference'],
      'post_id': ['reference'],
      'category_id': ['reference', {'minimum': [1]}],
      'tag_id': ['reference', {'minimum': [1]}],
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  deletePost = (data, callback) => {
    let validator = new Object({
      'author_id': ['reference'],
      'post_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  updateMeta = (data, callback) => {
    let validator = new Object({
      'author_id': ['reference'],
      'post_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

}

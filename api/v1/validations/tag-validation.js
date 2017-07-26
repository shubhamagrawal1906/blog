import Validation from './validation';

export default class TagValidation extends Validation {

  constructor() {
    super();
  }

  getAllTag = (data, callback) => {
    let validator = new Object({
      'author_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  getTag = (data, callback) => {
    let validator = new Object({
      'author_id': ['reference'],
      'tag_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  createTag = (data, callback) => {
    let validator = new Object({
      'content': ['required', 'string'],
      'author_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  updateTag = (data, callback) => {
    let validator = new Object({
      'content': ['required', 'string'],
      'author_id': ['reference'],
      'tag_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  deleteTag = (data, callback) => {
    let validator = new Object({
      'author_id': ['reference'],
      'tag_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

}

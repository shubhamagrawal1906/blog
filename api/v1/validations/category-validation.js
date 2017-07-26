import Validation from './validation';

export default class CategoryValidation extends Validation {

  constructor() {
    super();
  }

  getAllCategory = (data, callback) => {
    let validator = new Object({
      'author_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  getCategory = (data, callback) => {
    let validator = new Object({
      'category_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  createCategory = (data, callback) => {
    let validator = new Object({
      'content': ['required', 'string'],
      'author_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  updateCategory = (data, callback) => {
    let validator = new Object({
      'content': ['required', 'string'],
      'author_id': ['reference'],
      'category_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  deleteCategory = (data, callback) => {
    let validator = new Object({
      'author_id': ['reference'],
      'category_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

}

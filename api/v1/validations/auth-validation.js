import Validation from './validation';

export default class AuthValidation extends Validation {

  constructor() {
    super();
  }

  registerUser = (data, callback) => {
    let validator = new Object({
      'first_name': ['required', 'string', 'without_space'],
      'last_name': ['string', 'without_space'],
      'email': ['required', 'email'],
      'password': ['required', 'without_space', {'minimum': [6]}],
      'mobile': ['number', {'equal': [10]}]
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  loginUser = (data, callback) => {
    let validator = new Object({
      'email': ['required', 'email'],
      'password': ['required', 'without_space', {'minimum': [6]}]
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  activateUser = (data, callback) => {
    let validator = new Object({
      'token': ['token'],
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  getForgetPassword = (data, callback) => {
    let validator = new Object({
      'token': ['token'],
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  postForgetPassword = (data, callback) => {
    let validator = new Object({
      'email': ['required', 'email'],
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  changePassword = (data, callback) => {
    let validator = new Object({
      'current_password': ['required', 'without_space', {'minimum': [6]}],
      'new_password': ['required', 'without_space', {'minimum': [6]}],
      'author_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  getAllUser = (data, callback) => {
    let validator = new Object({
      'author_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

  getUser = (data, callback) => {
    let validator = new Object({
      'user_id': ['reference']
    });
    super.validate(data, validator, (data) => {
      callback(data);
    });
  }

}

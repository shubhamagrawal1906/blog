import AuthValidation from './../validations/auth-validation';
import AuthRepository from './../repositories/auth-repository';
import Service from './service';

export default class AuthService extends Service {

  constructor() {
    super();
    this.authRepository = new AuthRepository();
    this.authValidation = new AuthValidation();
  }

  registerUser = (data, callback) => {
    this.authValidation.registerUser(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.authRepository.registerUser(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  loginUser = (data, callback) => {
    this.authValidation.loginUser(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.authRepository.loginUser(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  activateUser = (data, callback) => {
    this.authValidation.activateUser(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.authRepository.activateUser(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  getForgetPassword = (data, callback) => {
    this.authValidation.getForgetPassword(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.authRepository.getForgetPassword(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  postForgetPassword = (data, callback) => {
    this.authValidation.postForgetPassword(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.authRepository.postForgetPassword(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  changePassword = (data, callback) => {
    this.authValidation.changePassword(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.authRepository.changePassword(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }
  getAllUser = (data, callback) => {
    this.authValidation.getAllUser(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.authRepository.getAllUser(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  getUser = (data, callback) => {
    this.authValidation.getUser(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.authRepository.getUser(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

}

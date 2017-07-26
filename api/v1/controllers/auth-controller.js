import AuthService from './../services/auth-service';
import Controller from './controller';

export default class AuthController extends Controller {

  constructor() {
    super();
    this.authService = new AuthService();
  }

  registerUser = (req, res) => {
    this.authService.registerUser(req.body, (data) => {
      this.controller(res, data);
    });
  }

  loginUser = (req, res) => {
    this.authService.loginUser(req.body, (data) => {
      this.controller(res, data);
    });
  }

  activateUser = (req, res) => {
    this.authService.activateUser(req.body, (data) => {
      this.controller(res, data);
    });
  }

  getForgetPassword = (req, res) => {
    this.authService.getForgetPassword(req.body, (data) => {
      this.controller(res, data);
    });
  }

  postForgetPassword = (req, res) => {
    this.authService.postForgetPassword(req.body, (data) => {
      this.controller(res, data);
    });
  }

  changePassword =  (req, res) => {
    this.authService.changePassword(req.body, (data) => {
      this.controller(res, data);
    });
  }

  getAllUser = (req, res) => {
    this.authService.getAllUser(req.body, (data) => {
      this.controller(res, data);
    });
  }

  getUser = (req, res) => {
    this.authService.getUser(req.body, (data) => {
      this.controller(res, data);
    });
  }

}

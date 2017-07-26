import AuthController from './../controllers/auth-controller';
import Helper from './../miscellaneous/helper';

export default class AuthRoute {

  constructor(router) {
    this.authController = new AuthController();
    this.helper = new Helper();
    this.router = router;
  }

  get getRoutes() {
    this.router.use('/*', (req, res, next) => { this.authenticateSecretKey(req, res, next) });
    this.router.post('/auth/register/', (req, res) => { this.registerUser(req, res) });
    this.router.post('/auth/login/',  (req, res) => { this.loginUser(req, res) });
    this.router.get('/auth/activate/:token',  (req, res) => { this.activateUser(req, res) });
    this.router.get('/auth/forgetpassword/:token', (req, res) => { this.getForgetPassword(req, res) });
    this.router.post('/auth/forgetpassword/', (req, res) => { this.postForgetPassword(req, res) });
    this.router.use('/*', (req, res, next) => { this.authenticateApiToken(req, res, next) });
    this.router.post('/auth/changepassword/', (req, res) => { this.changePassword(req, res) });
    this.router.use('/*', (req, res, next) => { this.changePasswordAuthentication(req, res, next) });
    this.router.get('/user/', (req, res) => { this.getAllUser(req, res) });
    this.router.get('/user/:id', (req, res) => { this.getUser(req, res) });
    return this.router;
  }

  authenticateSecretKey = (req, res, next) => {
    let api_secret_key = req.headers['api-secret-key'];
    let response = this.helper.authenticateSecretKey(api_secret_key);
    if(response.res !== 204) {
      this.helper.sendResponse(res, this.helper.httpCode(response));
    }else if(response.res === 204){
      req.body.search = req.query.search;
      req.body.filter = req.query.filter;
      req.body.sort = req.query.sort;
      req.body.page = req.query.page;
      req.body.include = req.query.include;
      next();
    }
  }

  registerUser = (req, res) => {
    this.authController.registerUser(req, res);
  }

  loginUser = (req, res) => {
    this.authController.loginUser(req, res);
  }

  activateUser = (req, res) => {
    req.body.token = req.params.token;
    this.authController.activateUser(req, res);
  }

  getForgetPassword = (req, res) => {
    req.body.token = req.params.token;
    this.authController.getForgetPassword(req, res);
  }

  postForgetPassword = (req, res) => {
    this.authController.postForgetPassword(req, res);
  }

  authenticateApiToken = (req, res, next) => {
    let api_token = req.headers['api-token'];
    this.helper.authenticateApiToken(api_token, (response) => {
      if(response.res !== 200) {
        this.helper.sendResponse(res, this.helper.httpCode(response));
      }else if(response.res === 200) {
        req.body.author_id = response.data._id;
        req.user = response.data;
        next();
      }
    });
  }

  changePassword = (req, res) => {
    this.authController.changePassword(req, res);
  }

  changePasswordAuthentication = (req, res, next) => {
    if(req.user.password_status == true) {
      let response = {"res": 403, "msg": "Please, first change your password"}
      this.helper.sendResponse(res, this.helper.httpCode(response));
    }else {
      next();
    }
  }

  getAllUser = (req, res) => {
    this.authController.getAllUser(req, res);
  }

  getUser = (req, res) => {
    req.body.user_id = mongoose.Types.ObjectId(req.params.id);
    this.authController.getUser(req, res);
  }

}

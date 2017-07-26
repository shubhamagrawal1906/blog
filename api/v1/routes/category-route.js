import CategoryController from './../controllers/category-controller';
import Helper from './../miscellaneous/helper';
import mongoose from 'mongoose';

export default class CategoryRoute {

  constructor(router) {
    this.categoryController = new CategoryController();
    this.helper = new Helper();
    this.router = router;
  }

  get getRoutes() {
    this.router.get('/category/', (req, res) => { this.getAllCategory(req, res) });
    this.router.get('/category/:id', (req, res) => { this.getCategory(req, res) });
    this.router.use('/category/*', (req, res, next) => { this.categoryAuthentication(req, res, next) });
    this.router.post('/category/', (req, res) => { this.createCategory(req, res) });
    this.router.put('/category/:id', (req, res) => { this.updateCategory(req, res) });
    this.router.delete('/category/:id', (req, res) => { this.deleteCategory(req, res) });
    return this.router;
  }

  getAllCategory = (req, res) => {
    this.categoryController.getAllCategory(req, res);
  }

  getCategory = (req, res) => {
    req.body.category_id = mongoose.Types.ObjectId(req.params.id);
    this.categoryController.getCategory(req, res);
  }

  categoryAuthentication = (req, res, next) => {
    if(!req.user.is_admin) {
      let response = {"res": 403, "msg": "You don't have permission to access it"};
      this.helper.sendResponse(res, this.helper.httpCode(response));
    }else {
      next();
    }
  }

  createCategory = (req, res) => {
    this.categoryController.createCategory(req, res);
  }

  updateCategory = (req, res) => {
    req.body.category_id = mongoose.Types.ObjectId(req.params.id);
    this.categoryController.updateCategory(req, res);
  }

  deleteCategory = (req, res) => {
    req.body.category_id = mongoose.Types.ObjectId(req.params.id);
    this.categoryController.deleteCategory(req, res);
  }

}

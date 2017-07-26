import CategoryService from './../services/category-service';
import Controller from './controller';

export default class CategoryController extends Controller {

  constructor() {
    super();
    this.categoryService = new CategoryService();
  }

  getAllCategory = (req, res) => {
    this.categoryService.getAllCategory(req.body, (data) => {
      this.controller(res, data);
    });
  }

  getCategory = (req, res) => {
    this.categoryService.getCategory(req.body, (data) => {
      this.controller(res, data);
    });
  }

  createCategory = (req, res) => {
    this.categoryService.createCategory(req.body, (data) => {
      this.controller(res, data);
    });
  }

  updateCategory = (req, res) => {
    this.categoryService.updateCategory(req.body, (data) => {
      this.controller(res, data);
    });
  }

  deleteCategory = (req, res) => {
    this.categoryService.deleteCategory(req.body, (data) => {
      this.controller(res, data);
    });
  }

}

import CategoryValidation from './../validations/category-validation';
import CategoryRepository from './../repositories/category-repository';
import Service from './service';

export default class CategoryService extends Service {

  constructor() {
    super();
    this.categoryRepository = new CategoryRepository();
    this.categoryValidation = new CategoryValidation();
  }

  getAllCategory = (data, callback) => {
    this.categoryValidation.getAllCategory(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.categoryRepository.getAllCategory(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  getCategory = (data, callback) => {
    this.categoryValidation.getCategory(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.categoryRepository.getCategory(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  createCategory = (data, callback) => {
    this.categoryValidation.createCategory(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.categoryRepository.createCategory(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  updateCategory = (data, callback) => {
    this.categoryValidation.updateCategory(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.categoryRepository.updateCategory(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  deleteCategory = (data, callback) => {
    this.categoryValidation.deleteCategory(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.categoryRepository.deleteCategory(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }
}

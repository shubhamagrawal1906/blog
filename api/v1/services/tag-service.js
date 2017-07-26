import TagValidation from './../validations/tag-validation';
import TagRepository from './../repositories/tag-repository';
import Service from './service';

export default class TagService extends Service {

  constructor() {
    super();
    this.tagRepository = new TagRepository();
    this.tagValidation = new TagValidation();
  }

  getAllTag = (data, callback) => {
    this.tagValidation.getAllTag(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.tagRepository.getAllTag(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  getTag = (data, callback) => {
    this.tagValidation.getTag(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.tagRepository.getTag(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  createTag = (data, callback) => {
    this.tagValidation.createTag(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.tagRepository.createTag(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  updateTag = (data, callback) => {
    this.tagValidation.updateTag(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.tagRepository.updateTag(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  deleteTag = (data, callback) => {
    this.tagValidation.deleteTag(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.tagRepository.deleteTag(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }
}

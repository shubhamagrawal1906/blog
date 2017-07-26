import PostValidation from './../validations/post-validation';
import PostRepository from './../repositories/post-repository';
import Service from './service';

export default class PostService extends Service {

  constructor() {
    super();
    this.postRepository = new PostRepository();
    this.postValidation = new PostValidation();
  }

  getAllPost = (data, callback) => {
    this.postValidation.getAllPost(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.postRepository.getAllPost(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  getPost = (data, callback) => {
    this.postValidation.getPost(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.postRepository.getPost(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  createPost = (data, callback) => {
    this.postValidation.createPost(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.postRepository.createPost(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  updatePost = (data, callback) => {
    this.postValidation.updatePost(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.postRepository.updatePost(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  deletePost = (data, callback) => {
    this.postValidation.deletePost(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.postRepository.deletePost(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  updateView = (data, callback) => {
    this.postValidation.updateMeta(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.postRepository.updateView(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  updateLike = (data, callback) => {
    this.postValidation.updateMeta(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.postRepository.updateLike(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

  updateDislike = (data, callback) => {
    this.postValidation.updateMeta(data, (res) => {
      if(res["error"].length > 0) {
        callback(res);
      }else {
        this.postRepository.updateDislike(data, (data) => {
          callback(this.service(data));
        });
      }
    });
  }

}

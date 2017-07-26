import PostModel from './../models/post-model';
import Repository from './repository';

export default class PostRepository extends Repository {

  constructor() {
    super();
  }

  getAllPost = (data, callback) => {
    let postSet = {};
    let {query, query_count, pageLimit} = super.queryMassGenerator(PostModel, postSet, data, 'post');
    let find = super.promisify(query.exec());
    find
    .then((posts) => {
      super.promisify(query_count.count().exec())
      .then((count) => {
        callback({"res": 200, "msg": "All posts are retrieved", "data": {"total": count, "pages": Math.ceil(count/pageLimit), "data": posts}});
      })
      .catch((err) => {
        callback({"res": 500});
      });
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  getPost = (data, callback) => {
    let postSet = {
      _id: data.post_id
    }
    let query = super.queryGenerator(PostModel, postSet, data, 'post');
    let findOne = super.promisify(query.exec());
    findOne
    .then((post) => {
      if(post !== null) {
        callback({"res": 200, "msg": "Post is retrieved", "data": post});
      }else {
        callback({"res": 404, "msg": "Post not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

  createPost = (data, callback) => {
    let postSet = {
      title: data.title,
      article: data.article,
      file: data.file,
      banner_image: data.banner_image,
      author_id: data.author_id,
      category_id: data.category_id,
      tag_id: data.tag_id,
      created_at: new Date(),
      updated_at: new Date()
    };
    let post = new PostModel(postSet);
    let query = post.save();
    let save = super.promisify(query);
    save
    .then((post) => {
      data["post_id"] = post._id;
      this.getPost(data, (data) => {
        callback({"res": 201, "msg": "Post is created", "data": data["data"]});
      });
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  updatePost = (data, callback) => {
    let query = PostModel.findById(data.post_id);
    let findById = super.promisify(query.exec());
    findById
    .then((post) => {
      if(post !== null) {
        if(super.compareId(post.author_id, data.author_id)) {
          let postSet = {
            title: data.title,
            article: data.article,
            file: data.file,
            banner_image: data.banner_image,
            tag_id: data.tag_id,
            updated_at: new Date(),
          };
          let query = PostModel.update({ _id: post._id }, { $set: postSet }, {multi: true});
          let update = super.impromisify(query);
          update
          .then((result) => {
            callback({"res": 204, "msg": "Post is updated"});
          })
          .catch((err) => {
            callback({"res": 500});
          });
        }else {
          callback({"res": 401, "msg": "You are not authenticated user"});
        }
      }else {
        callback({"res": 404, "msg": "Post not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

  deletePost = (data, callback) => {
    let query = PostModel.findById(data.post_id);
    let findById = super.promisify(query.exec());
    findById
    .then((post) => {
      if(post !== null) {
        if(super.compareId(post.author_id, data.author_id)) {
          let query = post.remove();
          let remove = super.promisify(query);
          remove
          .then((result) => {
            this.getPost(data, (data) => {
              callback({"res": 204, "msg": "Post is deleted"});
            });
          })
          .catch((err) => {
            callback({"res": 500});
          });
        }else {
          callback({"res": 401, "msg": "You are not authenticated user"});
        }
      }else {
        callback({"res": 404, "msg": "Post not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

  updateView = (data, callback) => {
    let query = PostModel.findById(data.post_id);
    let findById = super.promisify(query.exec());
    findById
    .then((post) => {
      if(post !== null) {
        let query = PostModel.update({ _id: post._id }, {$addToSet: {view: data.author_id}});
        let update = super.promisify(query.exec());
        update
        .then((result) => {
          callback({"res": 204, "msg": "View is updated"});
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }else {
        callback({"res": 404, "msg": "Post not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

  updateLike = (data, callback) => {
    let query = PostModel.findById(data.post_id);
    let findById = super.promisify(query.exec());
    findById
    .then((post) => {
      if(post !== null) {
        let query = PostModel.findOne({_id: data.post_id, like: data.author_id});
        let find = super.promisify(query.exec());
        find
        .then((post) => {
          if(post === null) {
            let query = PostModel.update({ _id: data.post_id }, {$push: {like: data.author_id}});
            let update = super.promisify(query.exec());
            update
            .then((result) => {
              callback({"res": 204, "msg": "Like is added"});
            })
            .catch((err) => {
              callback({"res": 500});
            });
          } else {
            let query = PostModel.update({ _id: data.post_id }, {$pull: {like: data.author_id}});
            let update = super.promisify(query.exec());
            update
            .then((result) => {
              callback({"res": 204, "msg": "Like is removed"});
            })
            .catch((err) => {
              callback({"res": 500});
            });
          }
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }else {
        callback({"res": 404, "msg": "Post not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  updateDislike = (data, callback) => {
    let query = PostModel.findById(data.post_id);
    let findById = super.promisify(query.exec());
    findById
    .then((post) => {
      if(post !== null) {
        let query = PostModel.findOne({_id: data.post_id, dislike: data.author_id});
        let find = super.promisify(query.exec());
        find
        .then((post) => {
          if(post === null) {
            let query = PostModel.update({ _id: data.post_id }, {$push: {dislike: data.author_id}});
            let update = super.promisify(query.exec());
            update
            .then((result) => {
              callback({"res": 204, "msg": "Dislike is added"});
            })
            .catch((err) => {
              callback({"res": 500});
            });
          } else {
            let query = PostModel.update({ _id: data.post_id }, {$pull: {dislike: data.author_id}});
            let update = super.promisify(query.exec());
            update
            .then((result) => {
              callback({"res": 204, "msg": "Dislike is removed"});
            })
            .catch((err) => {
              callback({"res": 500});
            });
          }
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }else {
        callback({"res": 404, "msg": "Post not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

}

import CommentModel from './../models/comment-model';
import PostModel from './../models/post-model';
import Repository from './repository';

export default class CommentRepository extends Repository {

  constructor() {
    super();
  }

  getPostComment = (data, callback) => {
    let commentSet = {
      post_id: data.post_id
    }
    let {query, query_count, pageLimit} = super.queryMassGenerator(CommentModel, commentSet, data, 'comment');
    let find = super.promisify(query.exec());
    find
    .then((comments) => {
      super.promisify(query_count.count().exec())
      .then((count) => {
        callback({"res": 200, "msg": "All comments are retrieved", "data": {"total": count, "pages": Math.ceil(count/pageLimit), "data": comments}});
      })
      .catch((err) => {
        callback({"res": 500});
      });
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  getComment = (data, callback) => {
    let commentSet = {
      _id: data.comment_id
    }
    let query = super.queryGenerator(CommentModel, commentSet, data, 'comment');
    let findOne = super.promisify(query.exec());
    findOne
    .then((comment) => {
      if( comment !== null) {
        callback({"res": 200, "msg": "Comment is retrieved", "data": comment});
      }else {
        callback({"res": 404, "msg": "Comment not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

  createComment = (data, callback) => {
    let commentSet = {
      content: data.content,
      author_id: data.author_id,
      post_id:  data.post_id,
      author_id: data.author_id,
      created_at: new Date(),
      updated_at: new Date()
    };
    let comment = new CommentModel(commentSet);
    let query = comment.save();
    let save = super.promisify(query);
    save
    .then((comment) => {
      data["comment_id"] = comment._id;
      this.getComment(data, (data) => {
        callback({"res": 201, "msg": "Comment is created", "data": data["data"]});
      });
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  updateComment = (data, callback) => {
    let query = CommentModel.findById(data.comment_id);
    let findById = super.promisify(query.exec());
    findById
    .then((comment) => {
      if(comment !== null) {
        if(!super.compareId(comment.author_id, data.author_id)) {
          callback({"res": 401, "msg": "You are not authenticated user"});
        }else if(!super.compareId(comment.post_id, data.post_id)) {
          callback({"res": 401, "msg": "Post is not authenticated"});
        }else {
          let commentSet = {
            content: data.content,
            updated_at: new Date()
          }
          let query = CommentModel.update({ _id: comment._id }, { $set: commentSet }, {multi: true});
          let update = super.promisify(query.exec());
          update
          .then((result) => {
            callback({"res": 204, "msg": "Comment is updated"});
          })
          .catch((err) => {
            callback({"res": 500});
          });
        }
      }else {
        callback({"res": 404, "msg": "Post not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

  deleteComment = (data, callback) => {
    let query = CommentModel.findById(data.comment_id);
    let findById = super.promisify(query.exec());
    findById
    .then((comment) => {
      if(comment !== null) {
        if(!super.compareId(comment.author_id, data.author_id)) {
          callback({"res": 401, "msg": "You are not authenticated user"});
        }else if(!super.compareId(comment.post_id, data.post_id)) {
          callback({"res": 401, "msg": "Post is not authenticated"});
        }else {
          let query = comment.remove();
          let remove = super.promisify(query);
          remove
          .then((comment) => {
            callback({"res": 204, "msg": "Comment is deleted"});
          })
          .catch((err) => {
            callback({"res": 500});
          });
        }
      }else {
        callback({"res": 404, "msg": "Comment not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

  updateLike  = (data, callback) => {
    let query = CommentModel.findById(data.comment_id);
    let findById = super.promisify(query.exec());
    findById
    .then((comment) => {
      if(comment !== null) {
        let query = CommentModel.findOne({_id: data.comment_id, like: data.author_id});
        let find = super.promisify(query.exec());
        find
        .then((comment) => {
          if(comment === null) {
            let query = CommentModel.update({ _id: data.comment_id }, {$push: {like: data.author_id}});
            let update = super.promisify(query.exec());
            update
            .then((result) => {
              callback({"res": 204, "msg": "Like is added"});
            })
            .catch((err) => {
              callback({"res": 500});
            });
          } else {
            let query = CommentModel.update({ _id: data.comment_id }, {$pull: {like: data.author_id}});
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
        callback({"res": 404, "msg": "Comment not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  updateDislike = (data, callback) => {
    let query = CommentModel.findById(data.comment_id);
    let findById = super.promisify(query.exec());
    findById
    .then((comment) => {
      if(comment !== null) {
        let query = CommentModel.findOne({_id: data.comment_id, dislike: data.author_id});
        let find = super.promisify(query.exec());
        find
        .then((comment) => {
          if(comment === null) {
            let query = CommentModel.update({ _id: data.comment_id }, {$push: {dislike: data.author_id}});
            let update = super.promisify(query.exec());
            update
            .then((result) => {
              callback({"res": 204, "msg": "Dislike is added"});
            })
            .catch((err) => {
              callback({"res": 500});
            });
          } else {
            let query = CommentModel.update({ _id: data.comment_id }, {$pull: {dislike: data.author_id}});
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
        callback({"res": 404, "msg": "Comment not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

}

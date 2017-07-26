import mongoose from 'mongoose';
import User from './auth-model';
import Post from './post-model';
import Repository from './../repositories/repository';

let Schema = mongoose.Schema;

let commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    setDefaultsOnInsert: false
  },
  updated_at: {
    type: Date,
    default: Date.now,
    setDefaultsOnInsert: true
  },
  author_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  like: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislike: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

commentSchema.pre('remove', function(next) {
  let comment = this;
  let repository = new Repository();
  let query = User.update({ _id: comment.author_id }, {$pull: {comment_id: comment._id}});
  let update = repository.promisify(query.exec());
  update
  .then((result) => {
    let query = Post.update({ _id: comment.post_id }, {$pull: {comment_id: comment._id}});
    let update = repository.promisify(query.exec());
    update
    .then((result) => {
      next();
    })
    .catch((err) => {
      next(err);
    })
  })
  .catch((err) => {
    next(err);
  });
});


commentSchema.post('save', function(comment) {
  let repository = new Repository();
  let query = User.update({ _id: comment.author_id }, {$push: {comment_id: comment._id}});
  let update = repository.promisify(query.exec());
  update
  .then((result) => {
    let query = Post.update({ _id: comment.post_id }, {$push: {comment_id: comment._id}});
    let update = repository.promisify(query.exec());
    update
    .then((comment) => {})
    .catch((err) => {});
  })
  .catch((err) => {});
});

export default mongoose.model('Comment', commentSchema);

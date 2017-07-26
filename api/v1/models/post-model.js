import mongoose from 'mongoose';
import async from 'async';
import User from './auth-model';
import Comment from './comment-model';
import Category from './category-model';
import Tag from './tag-model';
import Repository from './../repositories/repository';

let Schema = mongoose.Schema;

let postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  article: {
    type: String,
    required: true
  },
  file: String,
  banner_image: String,
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
  comment_id: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  category_id: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }],
  tag_id: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  view: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  like: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislike: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

postSchema.pre('remove', function(next) {
  let post = this;
  let repository = new Repository();
  let query = User.update({ _id: post.author_id }, {$pull: {post_id: post._id}});
  let update = repository.promisify(query.exec());
  update
  .then((result) => {
    async.eachSeries(post.category_id, (cat_id, done) => {
      Category.update({ _id: cat_id }, {$pull: {post_id: post._id, user_id: post.author_id}}, done);
    },(err) => {
      if(err === null) {
        next(err);
      }
      async.eachSeries(post.tag_id, (t_id, done) => {
        Tag.update({ _id: t_id }, {$pull: {post_id: post._id, user_id: post.author_id}}, done);
      },(err) => {
        if(err === null) {
          next(err);
        }
        next();
      });
    });
  })
  .catch((err) => {
    next(err);
  });
});

postSchema.post('save', function(post) {
  let repository = new Repository();
  let promises = [];
  let query = User.update({ _id: post.author_id }, {$push: {post_id: post._id}});
  let update = repository.promisify(query.exec());
  update
  .then((result) => {
    async.eachSeries(post.category_id, (cat_id, done) => {
      Category.update({ _id: cat_id }, {$push: {post_id: post._id}, $addToSet: {user_id: post.author_id}}, {upsert: true}, done);
    },(err) => {
      if(!err) {
        async.eachSeries(post.tag_id, (t_id, done) => {
          Tag.update({ _id: t_id }, {$push: {post_id: post._id}, $addToSet: {user_id: post.author_id}}, {upsert: true}, done);
        },(err) => {});
      }
    });
  })
  .catch((err) => {});
});

postSchema.post('update', function(post) {
  async.eachSeries(post.category_id, (cat_id, done) => {
    Category.update({ _id: cat_id }, {$addToSet: {post_id: post._id, user_id: post.author_id}}, done);
  },(err) => {
    if(!err) {
      async.eachSeries(post.tag_id, (t_id, done) => {
        Tag.update({ _id: t_id }, {$addToSet: {post_id: post._id, user_id: post.author_id}}, done);
      },(err) => {});
    }
  });
});

export default mongoose.model('Post', postSchema);

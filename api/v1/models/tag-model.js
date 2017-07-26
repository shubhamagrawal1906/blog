import mongoose from 'mongoose';
import async from 'async';
import User from './auth-model';
import Post from './post-model';
import Repository from './../repositories/repository';

let Schema = mongoose.Schema;

let tagSchema = new Schema({
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
  user_id: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  post_id: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

tagSchema.pre('remove', function(next) {
  let tag = this;
  let repository = new Repository();
  async.eachSeries(tag.post_id, (p_id, done) => {
    Post.update({ _id: p_id }, {$pull: {tag_id: tag._id}}, done);
  },(err) => {
    if(err === null) {
      next(err);
    }
    next();
  });
});

export default mongoose.model('Tag', tagSchema);

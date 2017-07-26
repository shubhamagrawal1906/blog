import mongoose from 'mongoose';
import Post from './post-model';
import Comment from './comment-model';

let Schema = mongoose.Schema;

let userSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: String,
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: '{VALUE} is not a valid email'
    },
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  mobile: {
    type: Number,
    validate: {
      validator: (v) => {
        return v.length !== 10;
      },
      message: '{VALUE} is not a valid mobile'
    },
    sparse: true
  },
  api_token: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: false,
    setDefaultsOnInsert: true
  },
  activated_token: {
    type: String,
    required: true
  },
  is_staff: {
    type: Boolean,
    default: false,
    setDefaultsOnInsert: true
  },
  is_admin: {
    type: Boolean,
    default: false,
    setDefaultsOnInsert: true
  },
  password_status: {
    type: Boolean,
    default: false,
    setDefaultsOnInsert: false
  },
  created_at: {
    type: Date,
    default: Date.now,
    setDefaultsOnInsert: true
  },
  updated_at: {
    type: Date,
    default: Date.now,
    setDefaultsOnInsert: false
  },
  last_login: Date,
  website: {
    type: String,
    validate: {
      validator: (v) => {
        return /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(v)
      },
      message: '{VALUE} is not a valid url'
    }
  },
  post_id: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  comment_id: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});
export default mongoose.model('User', userSchema);

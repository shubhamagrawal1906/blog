import UserModel from './../models/auth-model';
import Repository from './repository';
import Helper from './../miscellaneous/helper';

export default class AuthRepository extends Repository {

  constructor() {
    super();
  }

  authenticateApiToken(token, callback) {
    let query = UserModel.findOne({ "api_token": token });
    let findOne = super.promisify(query.exec());
    findOne
    .then((user) => {
      if(user !== null) {
        callback({"res": 200, "msg": "Authenticated", "data": user});
      }else {
        callback({"res": 401, "msg": "Api token is incorrect"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  registerUser = (data, callback) => {
    let emailAuthenticateSet = {
      email: data.email
    };
    let query = UserModel.findOne(emailAuthenticateSet);
    let findOne = super.promisify(query.exec());
    findOne
    .then((user) => {
      if(user === null) {
        let userSet = {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: super.hashPassword(data.password),
          mobile: data.mobile,
          api_token: super.getToken(),
          is_active: false,
          activated_token: super.getToken(),
          is_staff: false,
          is_admin: false,
          password_status: false,
          created_at: new Date(),
          updated_at: new Date(),
          last_login: new Date('January 1, 2000 00:00:00'),
          website: 'http://example.com'
        };
        let user = new UserModel(userSet);
        let query = user.save();
        let register = super.promisify(query);
        register
        .then((user) => {
          // send mail
          console.log("http://127.0.0.1:8080/api/v1/auth/activate/" + String(user.api_token));
          callback({"res": 202, "msg": "Link send to your registered email"});
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }else {
        callback({"res": 409, "msg": "Email is already exists"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  loginUser = (data, callback) => {
    let userSet = {
      email: data.email
    }
    let query = UserModel.findOne(userSet);
    let findOne = super.promisify(query.exec());
    findOne
    .then((user) => {
      if(user === null) {
        callback({"res": 404, "msg": "Email is not present"});
      }else if(!super.matchPassword(user.password, data.password)) {
        callback({"res": 401, "msg": "Password is incorrect"});
      }else if(!user.is_active) {
        callback({"res": 401, "msg": "Your account is still not activated. Please go to your registered email to activate."});
      }else {
        user["api_token"] = super.getToken();
        user["last_login"] = new Date();
        let query = user.save();
        let update = super.promisify(query.exec());
        update
        .then((result) => {
          let query = Model.findById(user._id);
          let findById = this.promisify(query.exec());
          findById
          .then((user) => {
            if(user !== null) {
              callback({"res": 200, "msg": "You are successfully logged in", "data": {'api_token': user['api_token']}});
            }else {
              callback({"res": 404, "msg": "User not found"});
            }
          })
          .catch((err) => {
            callback({"res": 500});
          });
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  activateUser = (data, callback) => {
    let userSet = {
      api_token: data.token
    }
    let query = UserModel.findOne(userSet);
    let findOne = super.promisify(query.exec());
    findOne
    .then((user) => {
      if(user === null) {
        callback({"res": 401, "msg": "Token is incorrect"});
      }else {
        let userSet = {
          api_token: super.getToken(),
          is_active: true,
          last_login: new Date()
        }
        let query = UserModel.update({ _id: user._id }, { $set: userSet });
        let update = super.promisify(query.exec());
        update
        .then((result) => {
          // send mail you have been activated now you can enjoy
          callback({"res": 204, "msg": "Your account is now activated"});
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  getForgetPassword = (data, callback) => {
    let userSet = {
      api_token: data.token
    }
    let query = UserModel.findOne(userSet);
    let findOne = super.promisify(query.exec());
    findOne
    .then((user) => {
      if(user === null) {
        callback({"res": 401, "msg": "Token is incorrect"});
      }else {
        let userSet = {
          api_token: super.getToken(),
          password_status: true,
          last_login: new Date()
        }
        let query = UserModel.update({ _id: user._id }, { $set: userSet });
        let update = super.promisify(query.exec());
        update
        .then((result) => {
          let query = Model.findById(user._id);
          let findById = this.promisify(query.exec());
          findById
          .then((user) => {
            if(user !== null) {
              callback({"res": 200, "msg": "You are successfully logged in, please change your password", "data": {'api_token': user['api_token']}});
            }else {
              callback({"res": 404, "msg": "User not found"});
            }
          })
          .catch((err) => {
            callback({"res": 500});
          });
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  postForgetPassword = (data, callback) => {
    let userSet = {
      email: data.email
    }
    let query = UserModel.findOne(userSet);
    let findOne = super.promisify(query.exec());
    findOne
    .then((user) => {
      if(user === null) {
        callback({"res": 404, "msg": "Email is not present"});
      }else {
        // let helper = new Helper();
        // helper.sendMail(user.email, "Forget Password", "http://127.0.0.1:8080/api/v1/auth/forgetpassword/" + String(user.api_token), "<h1>Hello</h1>", (data) => {
        //
        //   callback(data);
        // });
        console.log("http://127.0.0.1:8080/api/v1/auth/forgetpassword/" + String(user.api_token));
        callback({"res": 204, "msg": "Link send to your registered email"});
      }
    })
    .catch((err) => {
      console.log(err);
      callback({"res": 500});
    });
  }

  changePassword = (data, callback) => {
    let query = UserModel.findById(data.author_id);
    let findById = super.promisify(query.exec());
    findById
    .then((user) => {
      if(user === null) {
        callback({"res": 404, "msg": "User not found"});
      }else if(!super.matchPassword(user.password, data.current_password)) {
        callback({"res": 401, "msg": "Current password is incorrect"});
      }else {
        let userSet = {
          password: super.hashPassword(data.new_password),
          password_status: false,
          updated_at: new Date()
        }
        let query = UserModel.update({ _id: user._id }, {$set: userSet}, {multi: true});
        let update = super.promisify(query.exec());
        update
        .then((result) => {
          // send mail password changed successfully
          callback({"res": 204, "msg": "Your password has been changed successfully"});
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  getAllUser = (data, callback) => {
    let userSet = {};
    let {query, query_count, pageLimit} = super.queryMassGenerator(UserModel, userSet, data, 'user');
    let find = super.promisify(query.exec());
    find
    .then((users) => {
      super.promisify(query_count.count().exec())
      .then((count) => {
        callback({"res": 200, "msg": "All users are retrieved", "data": {"total": count, "pages": Math.ceil(count/pageLimit), "data": users}});
      })
      .catch((err) => {
        callback({"res": 500});
      });
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  getUser = (data, callback) => {
    let userSet = {
      _id: data.user_id
    }
    let query = super.queryGenerator(UserModel, userSet, data, 'user');
    let findOne = super.promisify(query.exec());
    findOne
    .then((user) => {
      if(user !== null) {
        callback({"res": 200, "msg": "User is retrieved", "data": user});
      }else {
        callback({"res": 404, "msg": "User not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

}

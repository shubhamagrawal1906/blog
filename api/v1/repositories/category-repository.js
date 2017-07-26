import CategoryModel from './../models/category-model';
import Repository from './repository';

export default class PostRepository extends Repository {

  constructor() {
    super();
  }

  getAllCategory = (data, callback) => {
    let categorySet = {};
    let {query, query_count, pageLimit} = super.queryMassGenerator(CategoryModel, categorySet, data, 'category');
    let find = super.promisify(query.exec());
    find
    .then((categories) => {
      super.promisify(query_count.count().exec())
      .then((count) => {
        callback({"res": 200, "msg": "All categories are retrieved", "data": {"total": count, "pages": Math.ceil(count/pageLimit), "data": categories}});
      })
      .catch((err) => {
        callback({"res": 500});
      });
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  getCategory = (data, callback) => {
    let categorySet = {
      _id: data.category_id
    }
    let query = super.queryGenerator(CategoryModel, categorySet, data, 'category');
    let findOne = super.promisify(query.exec());
    findOne
    .then((category) => {
      if(category !== null) {
        callback({"res": 200, "msg": "Category is retrieved", "data": category});
      }else {
        callback({"res": 404, "msg": "Category not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

  createCategory = (data, callback) => {
    let query = CategoryModel.findOne({content: data.content});
    let find = promisify(query.exec());
    query
    .then((category) => {
      if(category === null) {
        let categorySet = {
          content: data.content,
          author_id: data.author_id,
          created_at: new Date(),
          updated_at: new Date()
        };
        let category = new CategoryModel(categorySet);
        let query = category.save();
        let save = super.promisify(query);
        save
        .then((category) => {
          data["category_id"] = category._id;
          this.getCategory(data, (data) => {
            callback({"res": 201, "msg": "Category is created", "data": data["data"]});
          });
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }else {
        callback({"res": 409, "msg": "Category already exists"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  updateCategory = (data, callback) => {
    let query = CategoryModel.findOne({content: data.content});
    let find = super.promisify(query.exec());
    query
    .then((category) => {
      if(category === null) {
        let query = CategoryModel.findById(data.category_id);
        let findById = super.promisify(query.exec());
        findById
        .then((category) => {
          if(category !== null) {
            if(super.compareId(category.author_id, category.author_id)) {
              let categorySet = {
                content: data.content,
                author_id: data.author_id,
                updated_at: new Date()
              };
              let query = CategoryModel.update({ _id: category._id }, { $set: categorySet }, {multi: true});
              let update = super.promisify(query.exec());
              update
              .then((result) => {
                callback({"res": 204, "msg": "Category is updated"});
              })
              .catch((err) => {
                callback({"res": 500});
              });
            }else {
              callback({"res": 401, "msg": "You are not authenticated user"});
            }
          }else {
            callback({"res": 404, "msg": "Category not found"});
          }
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }else {
        callback({"res": 409, "msg": "Category already exists"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  deleteCategory = (data, callback) => {
    let query = CategoryModel.findById(data.category_id);
    let findById = super.promisify(query.exec());
    findById
    .then((category) => {
      if(category !== null) {
        if(super.compareId(category.author_id, category.author_id)) {
          let query = category.remove();
          let remove = super.promisify(query);
          remove
          .then((category) => {
            callback({"res": 204, "msg": "Category is deleted"});
          })
          .catch((err) => {
            callback({"res": 500});
          });
        }else {
          callback({"res": 401, "msg": "You are not authenticated user"});
        }
      }else {
        callback({"res": 404, "msg": "Category not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

}

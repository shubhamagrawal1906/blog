import TagModel from './../models/tag-model';
import Repository from './repository';

export default class TagRepository extends Repository {

  constructor() {
    super();
  }

  getAllTag = (data, callback) => {
    let tagSet = {};
    let {query, query_count, pageLimit} = super.queryMassGenerator(TagModel, tagSet, data, 'tag');
    let find = super.promisify(query.exec());
    find
    .then((tags) => {
      super.promisify(query_count.count().exec())
      .then((count) => {
        callback({"res": 200, "msg": "All tags are retrieved", "data": {"total": count, "pages": Math.ceil(count/pageLimit), "data": tags}});
      })
      .catch((err) => {
        callback({"res": 500});
      });
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  getTag = (data, callback) => {
    let tagSet = {
      _id: data.tag_id
    }
    let query = super.queryGenerator(TagModel, tagSet, data, 'tag');
    let findOne = super.promisify(query.exec());
    findOne
    .then((tag) => {
      if(tag !== null) {
        callback({"res": 200, "msg": "Tag is retrieved", "data": tag});
      }else {
        callback({"res": 404, "msg": "Tag not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

  createTag = (data, callback) => {
    let query = TagModel.findOne({content: data.content});
    let find = super.promisify(query.exec());
    find
    .then((tag) => {
      if(tag === null) {
        let tagSet = {
          content: data.content,
          author_id: data.author_id,
          created_at: new Date(),
          updated_at: new Date()
        };
        let tag = new TagModel(tagSet);
        let query = tag.save();
        let save = super.promisify(query);
        save
        .then((tag) => {
          data["tag_id"] = tag._id;
          this.getTag(data, (data) => {
            callback({"res": 201, "msg":"Tag is created", "data": data["data"]});
          });
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }else {
        callback({"res": 409, "msg": "Tag already exists"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  updateTag = (data, callback) => {
    let query = TagModel.findOne({content: data.content});
    let find = super.promisify(query.exec());
    query
    .then((tag) => {
      if(tag === null) {
        let query = TagModel.findById(data.tag_id);
        let findById = super.promisify(query.exec());
        findById
        .then((tag) => {
          if(tag !== null) {
            if(super.compareId(tag.author_id, data.author_id)) {
              let tagSet = {
                content: data.content,
                author_id: data.author_id,
                updated_at: new Date()
              };
              let query = TagModel.update({ _id: tag._id }, { $set: tagSet }, {multi: true});
              let update = super.promisify(query.exec());
              update
              .then((result) => {
                callback({"res": 204, "msg":"Tag is updated"});
              })
              .catch((err) => {
                callback({"res": 500});
              });
            }else {
              callback({"res": 401, "msg": "You are not authenticated user"});
            }
          }else {
            callback({"res": 404, "msg": "Tag not found"});
          }
        })
        .catch((err) => {
          callback({"res": 500});
        });
      }else {
        callback({"res": 409, "msg": "Tag already exists"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    });
  }

  deleteTag = (data, callback) => {
    let query = TagModel.findById(data.tag_id);
    let findById = super.promisify(query.exec());
    findById
    .then((tag) => {
      if(tag !== null) {
        if(super.compareId(tag.author_id, data.author_id)) {
          let query = tag.remove();
          let remove = super.promisify(query);
          remove
          .then((tag) => {
            callback({"res": 202, "msg":"Tag is removed"});
          })
          .catch((err) => {
            callback({"res": 500});
          });
        }else {
          callback({"res": 401, "msg": "You are not authenticated user"});
        }
      }else {
        callback({"res": 404, "msg": "Tag not found"});
      }
    })
    .catch((err) => {
      callback({"res": 500});
    })
  }

}

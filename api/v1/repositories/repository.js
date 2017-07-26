import Promise from 'mpromise';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import randtoken from 'rand-token';
import assert from 'assert';
import UserModel from './../models/auth-model';
import config from './../config';

export default class Repository{

  constructor() {
    this.env = config();
  }

  promisify(promise) {
    assert.ok(promise instanceof Promise);
    return promise;
  }

  impromisify(promise) {
    assert.ok(!(promise instanceof Promise));
    return promise;
  }

  hashPassword(password) {
    return bcrypt.hashSync(password);
  }

  matchPassword(hashedPassword, password) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  getToken() {
    let uid = randtoken.uid;
    return uid(64);
  }

  compareId(objectId1, objectId2) {
    return String(objectId1) === String(objectId2);
  }

  countLength = (objects) => {
    var count = 0;
    for (var object in objects) {
        if (objects.hasOwnProperty(object)) {
           ++count;
        }
    }
    return count;
  }

  authenticateReferences = (array) => {
    for(let element of array) {
      if(!(/^([a-f0-9])*$/.test(element)) || String(element).length !== 24) {
        return false;
      }
    }
    return true;
  }

  selectParameter = (mode) => {
    switch(mode) {
      case 'author_id':
        return '_id first_name last_name email mobile created_at updated_at';//_id first_name last_name email -password -mobile -api_token -is_active -activated_token -is_staff -is_admin -password_status -created_at -updated_at
      case 'user_id':
      case 'user':
        return  '_id first_name last_name email mobile created_at updated_at';//_id first_name last_name email -password -mobile -api_token -is_active -activated_token -is_staff -is_admin -password_status -created_at -updated_at
      case 'post_id':
      case 'post':
        return '_id title article file banner_image author_id comment_id category_id tag_id view like dislike created_at updated_at';//_id title article file banner_image author_id comment_id category_id tag_id view like dislike created_at updated_at
      case 'comment_id':
      case 'comment':
        return '_id content author_id post_id like dislike created_at updated_at';//_id content author_id post_id like dislike created_at updated_at
      case 'category_id':
      case 'category':
        return '_id content author_id user_id post_id created_at updated_at';//_id content author_id user_id post_id created_at updated_at
      case 'tag_id':
      case 'tag':
        return '_id content author_id user_id post_id created_at updated_at';//_id content author_id user_id post_id created_at updated_at
      default:
        return '';
    }
  }

  searchParameter = (mode) => {
    switch(mode) {
      case 'user':
        return ['first_name', 'email'];
      case 'post':
        return ['title', 'article'];
      case 'comment':
        return ['content'];
      case 'category':
        return ['content'];
      case 'tag':
        return ['content'];
      default:
        return [];
    }
  }

  filterParameter = (mode) => {
    switch(mode) {
      case 'user':
        return ['_id', 'post_id', 'comment_id'];
      case 'post':
        return ['_id', 'author_id', 'comment_id', 'category_id' ,'tag_id'];
      case 'comment':
        return ['_id', 'author_id', 'post_id'];
      case 'category':
        return ['_id', 'author_id', 'user_id', 'post_id'];
      case 'tag':
        return ['_id', 'author_id', 'user_id', 'post_id'];
      default:
        return [];
    }
  }

  sortParameter = (mode) => {
    switch(mode) {
      case 'user':
        return ['first_name', 'email', 'created_at', 'updated_at'];
      case 'post':
        return ['title', 'article', 'created_at', 'updated_at'];
      case 'comment':
        return ['content', 'created_at', 'updated_at'];
      case 'category':
        return ['content', 'created_at', 'updated_at'];
      case 'tag':
        return ['content', 'created_at', 'updated_at'];
      default:
        return [];
    }
  }

  paginationParameter = (mode) => {
    switch(mode) {
      case 'user':
        return this.env.page.USER;
      case 'post':
        return this.env.page.POST;
      case 'comment':
        return this.env.page.COMMENT;
      case 'category':
        return this.env.page.CATEGORY;
      case 'tag':
        return this.env.page.TAG;
      default:
        return this.env.page.DEFAULT;
    }
  }

  populationParameter = (mode) => {
    switch(mode) {
      case 'user':
        return ['post_id', 'comment_id'];
      case 'post':
        return ['author_id', 'comment_id', 'category_id', 'tag_id'];
      case 'comment':
        return ['author_id', 'post_id'];
      case 'category':
        return ['author_id', 'user_id', 'post_id'];
      case 'tag':
        return ['author_id', 'user_id', 'post_id'];
      default:
        return [];
    }
  }

  searchGenerator = (mode, search, searchQuery) => {
    let searchField = this.searchParameter(mode);
    if(search !==undefined) {
      let field = (search.split('|'))[0];
      let value = String((search.split('|'))[1]);
      if(searchField.indexOf(field) !== -1 && value.length > 0) {
        searchQuery[field] = new RegExp(".*"+value+".*", "i");
      }
    }
    return searchQuery;
  }

  filterGenerator = (mode, filters, filterQuery) => {
    let filterField = this.filterParameter(mode);
    if(filters !==undefined) {
      let filterInArray = [];
      let filter_operator = "$and";
      for(let filter of filters) {
        let field = (filter.split('|'))[0];
        let values = ((filter.split('|'))[1]).split(',');
        if(filterField.indexOf(field) !== -1 && this.authenticateReferences(values)) {
          let filterInObject = {};
          let inObject = {};
          inObject["$in"] = values;
          filterInObject[field] = inObject;
          filterInArray.push(filterInObject);
        }
      }
      if(filterInArray.length > 0) {
        filterQuery[filter_operator] = filterInArray;
      }
    }
    return filterQuery;
  }

  sortGenerator = (mode, sorts, query) => {
    let sortField = this.sortParameter(mode);
    let sortValue = [-1, 0, 1];
    let sortQuery = {};
    if(sorts !== undefined) {
      for(let sort of sorts) {
        let field = (sort.split('|'))[0];
        let value = parseInt((sort.split('|'))[1]);
        if(sortField.indexOf(field) !== -1 && sortValue.indexOf(value) !== -1) {
          sortQuery[field] = value;
        }
      }
      return query.sort(sortQuery);
    }
    return query;
  }

  paginationGenerator = (mode, page, query) => {
    let perPage = this.paginationParameter(mode);
    page = ((page === undefined || page < 1) ? 1 : parseInt(page));
    if(page !== NaN) {
      return query.limit(perPage).skip(perPage*(page-1));
    }
  }

  populationGenerator = (mode, includes, query) => {
    let includeField = this.populationParameter(mode);
    if(includes !== undefined) {
      for(let include of includes) {
        let field = include;
        if(includeField.indexOf(field) !== -1) {
          let selectedFields = this.selectParameter(field);
          query.populate({path: field, select:  selectedFields});
        }
      }
    }
    return query;
  }

  queryMassGenerator(Model, set, data, mode) {
    set = this.searchGenerator(mode, data.search, set);
    set = this.filterGenerator(mode, data.filter, set);
    let query = Model.find(set).select(this.selectParameter(mode));
    let query_count = Model.find(set).select(this.selectParameter(mode));
    query = this.sortGenerator(mode, data.sort, query);
    query = this.paginationGenerator(mode, data.page, query);
    query = this.populationGenerator(mode, data.include, query);
    let pageLimit = this.paginationParameter(mode)
    return {query, query_count, pageLimit};
  }

  queryGenerator(Model, set, data, mode) {
    let query = Model.findOne(set).select(this.selectParameter(mode));
    query = this.populationGenerator(mode, data.include, query);
    return query;
  }

  // findById(Model, id, callback) {
  //   let query = Model.findById(id);
  //   let findById = this.promisify(query.exec());
  //   findById
  //   .then((user) => {
  //     if(user !== null) {
  //       callback(user);
  //     }else {
  //       callback({"error": "Not found"});
  //     }
  //   })
  //   .catch((err) => {
  //     callback({"error": "Database error"});
  //   })
  // }
}

export default class Validation {

  constructor() {}

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  beautifyLetter = (string) => {
    let str = this.capitalizeFirstLetter(string);
    return str.replace(/_/g, " ");
  }

  required = (value) => {
    if(!value || value.length === 0) {
      return ' is required';
    }
    return '';
  }

  withoutSpace = (value) => {
    if(value.indexOf(' ') !== -1) {
      return  ' must not have any spaces';
    }
  }

  number = (value) => {
    if(isNaN(value)) {
      return ' must be number';
    }
    return '';
  }

  string = (value) => {
    if((!isNaN(value) || typeof(value) !== "string") && value.length !== 0) {
      return ' must be string';
    }
    return '';
  }

  date = (value) => {
    if(Object.prototype.toString.call(value) !== "[object Date]" || !isNaN(value.getTime())) {
      return ' must be date';
    }
    return ''
  }

  email = (value) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(value)) {
      return ' is invalid';
    }
    return '';
  }

  url = (value) => {
    let re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if(!re.test(value)) {
      return ' is invalid';
    }
    return '';
  }

  minimum = (value, modeValue) => {
    if(value.length < modeValue) {
      return ' length must be greater than ' + modeValue;
    }
    return '';
  }

  maximum = (value, modeValue) => {
    if(value.length > modeValue) {
      return ' length must be less than ' + modeValue;
    }
    return '';
  }

  equal = (value, modeValue) => {
    if(value.length !== modeValue && value.length !== 0) {
      return ' length must be equal to ' + modeValue;
    }
    return '';
  }

  between = (value, modeValue1, modeValue2) => {
    if(value.length < modeValue1 || value.length > modeValue2) {
      return ' length must be greater than ' + modeValue1 + ' and ' + 'less than ' + modeValue2;
    }
    return '';
  }

  reference = (value) => {
    let re = /^([a-f0-9])*$/;
    if(value instanceof Array) {
      for(let id of value) {
        id = String(id)
        if(!id || id.length !== 24 || !re.test(id)) {
          return ' detected invalid';
        }
      }
    }else {
      value = String(value)
      if(!value || value.length !== 24 || !re.test(value)) {
        return ' detected invalid';
      }
    }
    return '';
  }

  token = (value) => {
    value = String(value);
    let re = /^([A-Za-z0-9])*$/;
    if(!value || value.length !== 64 || !re.test(value)) {
      return ' detected invalid';
    }
    return '';
  }

  authenticate = (mode, value) => {
    let modeValue = [];
    if (typeof(mode) == 'object') {
      modeValue = mode[Object.keys(mode)[0]];
      mode = Object.keys(mode)[0];
    }
    switch(mode) {
      case 'required':
        return this.required(value);
      case 'without_space':
        return this.withoutSpace(value);
      case 'number':
        return this.number(value);
      case 'string':
        return this.string(value);
      case 'date':
        return this.date(value);
      case 'email':
        return this.email(value);
      case 'minimum':
        return this.minimum(value, modeValue[0]);
      case 'maximum':
        return this.maximum(value, modeValue[0]);
      case 'equal':
        return this.equal(value, modeValue[0]);
      case 'between':
        return this.between(value, modeValue[0], modeValue[1])
      case 'reference':
        return this.reference(value)
      case 'token':
        return this.token(value)
    }
  }

  validate(data, validator, callback) {
    let error = [];
    let error_code = 422;
    for(var key in validator) {
      if(data.hasOwnProperty(key)) {
        var value = data[key];
        try{
        validator[key].forEach((mode) => {
          let err = this.authenticate(mode, value);
          if(err) {
            error.push(this.beautifyLetter(key) + err);
            throw BreakException;
          }
        });}catch(e) {
          continue;
        }
      }else {
        error = "";
        error_code = 400;
        error = 'Invalid details';
        break;
      }
    }
    callback({"res": error_code, "error": error});
  }
}

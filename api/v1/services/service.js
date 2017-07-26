import Helper from './../miscellaneous/helper';

export default class Service {

  constructor() {
    this.helper = new Helper();
  }

  service(data) {
    return this.helper.httpCode(data);
  }

}

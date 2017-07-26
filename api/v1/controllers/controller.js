import Helper from './../miscellaneous/helper';

export default class Controller {

  constructor() {
    this.helper = new Helper();
  }

  controller(res, data) {
    this.helper.sendResponse(res, data);
  }
}

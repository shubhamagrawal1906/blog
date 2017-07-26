import TagController from './../controllers/tag-controller';
import Helper from './../miscellaneous/helper';
import mongoose from 'mongoose';

export default class TagRoute {

  constructor(router) {
    this.tagController = new TagController();
    this.helper = new Helper();
    this.router = router;
  }

  get getRoutes() {
    this.router.get('/tag/', (req, res) => { this.getAllTag(req, res) });
    this.router.get('/tag/:id', (req, res) => { this.getTag(req, res) });
    this.router.post('/tag/', (req, res) => { this.createTag(req, res) });
    this.router.use('/tag/*', (req, res, next) => { this.tagAuthentication(req, res, next) });
    this.router.put('/tag/:id', (req, res) => { this.updateTag(req, res) });
    this.router.delete('/tag/:id', (req, res) => { this.deleteTag(req, res) });
    this.router.post('/tag/search/', (req, res) => { this.searchTag(req, res) });
    return this.router;
  }

  getAllTag = (req, res) => {
    this.tagController.getAllTag(req, res);
  }

  getTag = (req, res) => {
    req.body.tag_id = mongoose.Types.ObjectId(req.params.id);
    this.tagController.getTag(req, res);
  }

  createTag = (req, res) => {
    this.tagController.createTag(req, res);
  }

  tagAuthentication = (req, res, next) => {
    if(!req.user.is_admin) {
      let response = {"res": 403, "msg": "You don't have permission to access it"};
      this.helper.sendResponse(res, this.helper.httpCode(response));
    }else {
      next();
    }
  }

  updateTag = (req, res) => {
    req.body.tag_id = mongoose.Types.ObjectId(req.params.id);
    this.tagController.updateTag(req, res);
  }

  deleteTag = (req, res) => {
    req.body.tag_id = mongoose.Types.ObjectId(req.params.id);
    this.tagController.deleteTag(req, res);
  }

}

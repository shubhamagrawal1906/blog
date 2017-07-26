import TagService from './../services/tag-service';
import Controller from './controller';

export default class TagController extends Controller {

  constructor() {
    super();
    this.tagService = new TagService();
  }

  getAllTag = (req, res) => {
    this.tagService.getAllTag(req.body, (data) => {
      this.controller(res, data);
    });
  }

  getTag = (req, res) => {
    this.tagService.getTag(req.body, (data) => {
      this.controller(res, data);
    });
  }

  createTag = (req, res) => {
    this.tagService.createTag(req.body, (data) => {
      this.controller(res, data);
    });
  }

  updateTag = (req, res) => {
    this.tagService.updateTag(req.body, (data) => {
      this.controller(res, data);
    });
  }

  deleteTag = (req, res) => {
    this.tagService.deleteTag(req.body, (data) => {
      this.controller(res, data);
    });
  }

}

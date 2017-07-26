import nodemailer from 'nodemailer';
import AuthRepository from './../repositories/auth-repository';
import config from './../config';

export default class Helper {

  constructor() {
    this.env = config();
    this.authRepository = new AuthRepository();
    this.transporter = nodemailer.createTransport({
      host: this.env.mail.HOST,
      port: this.env.mail.PORT,
      secure: this.env.mail.SECURE,
      auth: {
        user: this.env.mail.USERNAME,
        pass: this.env.mail.PASSWORD
      }
    });
  }

  getStatus = (code) => {
    switch(code) {
      case 200:
      case 201:
      case 202:
      case 204:
        return 'Success';
      case 400:
      case 401:
      case 403:
      case 404:
      case 409:
        return 'Error';
      case 500:
        return 'Internal Server Error';
      default:
        return 'No response';
    }
  }

  httpCode(response) {
    response['code'] = response['res'];
    delete response['res'];
    response['status'] =this.getStatus(response['code']);
    return response;
  }

  sendResponse(res, data) {
    res.json(data);
  }

  authenticateSecretKey(key) {
    if (key === undefined) {
      return {"res": 400, "msg": "Api secret key is missing"};
    }
    if(key !== this.env.API_SECRET_KEY) {
      return {"res": 401, "msg": "Api secret key is incorrect"};
    } else {
      return {"res": 204,  "msg": "Authenticated"};;
    }
  }

  authenticateApiToken(token, callback) {
    if(token === undefined) {
      callback({"res": 400, "msg": "Api token is missing"});
    }else {
      this.authRepository.authenticateApiToken(token, (response) => {
        callback(response);
      });
    }
  }

  sendMail(email, subject, body, html, callback) {
    let mailOption = {
      from: this.env.mail.DISPLAY_NAME,
      to: email,
      subject: subject,
      text: body
      // html: html
    };
    this.transporter.sendMail(mailOption, (err, info) => {
      if(err) {
        console.log(err);
        callback({"error": "Mail has been not send"});
      }else if(info) {
        callback({"msg": "Message " + info.messageId + " sent: " + info.response});
      }
    });
  }

}

import env from './../.env';
import production from './../env/production';
import development from './../env/development';
import testing from './../env/testing';

module.exports = (function () {
  let env_variable = env['env'];
  let config = {};
  switch(env_variable) {
    case 'production':
      config = production;
      break;
    case 'development':
      config = development;
      break;
    case 'testing':
      config = testing;
      break;
    default:
      console.error('NODE_ENV environment variable not set');
      process.exit(1);
  }
  return config;
});

module.exports = {
  DATABASE_URL: 'mongodb://localhost:27017/test',
  HOST: '127.0.0.1',
  PORT: 8080,
  BASE_URL: '/api/v1',
  API_SECRET_KEY: '$2a$10$/euEox.vZXMMJZ7RMn/X5OwPi4/1rc9mwAWnC7wpb4/02bFCXHS/C',
  mail: {
    HOST: 'smtp.gmail.com',
    POST: 465,
    SECURE: true,
    auth: {
      USERNAME: 'shubham199541@gmail.com',
      PASSWORD: 'salmanji@2010'
    },
    DISPLAY_NAME: '<shubham.agrawal@gmail.com>'
  },
  page: {
    USER: 10,
    POST: 10,
    COMMENT: 10,
    CATEGORY: 10,
    TAG: 10,
    DEFAULT: 10
  },
  PRESETS: ["es2015", "stage-2"]
};

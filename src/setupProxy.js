const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy([
    '/api',
    '/api/admin-data', 
    '/send', 
    '/save-stripe-token', 
    '/callback'
    ],{ target: 'http://localhost:4000/' }));
};
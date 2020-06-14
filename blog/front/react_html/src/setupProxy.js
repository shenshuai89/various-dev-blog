const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
      createProxyMiddleware(
            '/api',
            {
              target: 'http://127.0.0.1:8000',
              pathRewrite: {'^/api' : '/api'},
              changeOrigin: true,     // target是域名的话，需要这个参数，
              secure: false,    
            }
        )
    );
  };
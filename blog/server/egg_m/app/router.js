'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/blog/list', controller.blog.list);
  router.get('/api/blog/detail', controller.blog.detail);
  router.post('/api/blog/new', controller.blog.create);
  router.post('/api/blog/update', controller.blog.update);
  router.post('/api/blog/del', controller.blog.del);
  
  router.post('/api/user/login', controller.user.login);
};

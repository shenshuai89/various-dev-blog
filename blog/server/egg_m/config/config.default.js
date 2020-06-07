/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = exports = {};

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'various_blog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  config.cluster = {
    listen: {
      path: '',
      port: 8000,
      hostname: '127.0.0.1',
    }
  };

  config.security = {
    csrf: {
      headerName: 'x-csrf-token',// 自定义请求头
    }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1591520727947_8614';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: 'auth',
      db: 0
    },
  }

  return {
    ...config,
    ...userConfig,
  };
};

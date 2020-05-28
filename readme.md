使用多种技术方案开发简易blog系统，只是为了走通和梳理通技术流程，不追求页面外观细节点

* 后台使用node原生、express、koa2、Eggjs各开发一遍
* 前端页面使用vue、react开发
* 数据库选用mySql

为了能够快速下载和安装node_modules, 可以使用淘宝镜像地址--registry=https://registry.npm.taobao.org

## 后端

* 路由 > 连接数据库 > 实现登录

### node原生

#### 使用node开发http请求
  1.get请求, 通过querystring获取浏览器地址栏的数据a.html?a=100&b=200

``` js
let query = querystring.parse(req.url.spilt("?")[1])
```

  2.post请求

``` js
let postData = '';
req.on("data", (chunk) => {
    postData += chunk.toString() //数据在浏览器传输是流的形式
})
req.on("end", () => {
    console.log(postData);
    res.end(
        postData
    )
})
```

#### 根据http请求的接口，设置不同的路由

* 路由router
  + list: 获取博客列表
  + detail: 获取博客详情
  + new: 新建一篇博客
  + update: 更新博客内容
  + del: 删除一篇博客
  + login: user的登录接口
* model文件夹，统一处理数据模型格式
  + resModel中设置统一处理返回给客户端的数据格式，创建SuccessModel和ErrorModel两个类
* control文件夹，存放请求和获取数据的逻辑，定义一些处理方法，然后返回给router
  + getList: 获取博客列表数据
  + getDetail: 获取博客详情信息
  + newBlog: 创建一个博客
  + updateBlog: 更新博客
  + delBlog: 删除一篇博客

#### 创建数据库various_blog

创建表

``` sql
-- 创建blogs表
CREATE TABLE `blogs` (
`id` int(255) NOT NULL AUTO_INCREMENT ,
`title` varchar(50) NOT NULL ,
`content` longtext NOT NULL ,
`createtime` bigint NOT NULL ,
`author` varchar(20) NOT NULL ,
PRIMARY KEY ( `id` )
);
-- 创建users表
DROP TABLE IF EXISTS `users` ;
CREATE TABLE `users` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`username` varchar(20) NOT NULL,
`password` varchar(20) NOT NULL,
`realname` varchar(20) NOT NULL,
  PRIMARY KEY ( `id` )
);
```

插入数据

``` sql
-- 插入用户数据
INSERT INTO users (username, `password` , realname) VALUES ('zhangsan', '123', '张三');
INSERT INTO users (username, `password` , realname) VALUES ('lisi', '123', '李四');
-- 插入博客数据
INSERT INTO blogs (title, content, createtime, author) VALUES ('第2篇博客标题222', '第一篇博客内容222', 1590590733927, '张三');
INSERT INTO blogs (title, content, createtime, author) VALUES ('第3篇博客标题333', '第3篇博客内容333', 1590590733927, '张三');
```

查询数据

``` sql
select * from users;
-- 
select id, username from users;
-- 
select * from users where username='zhangsan' or 'password' = '123';
-- 按照一个字段模糊查询，默认是正序，后边加上desc是倒序
select * from users where password like '%1%' order by id;
select * from users where password like '%1%' order by id desc;
```

更新数据

``` sql
update users set realname = '李思' where username = 'lisi';
```

删除数据

``` sql
delete from users where username = 'lisi';
```

封装一个mysql查询的工具方法，db->mysql.js
``` js
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result);
    })
  })
  return promise
}
```

#### 实现登录login接口

### express框架

### koa3框架

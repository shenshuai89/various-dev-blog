使用多种技术方案开发简易blog系统，只是为了走通和梳理通技术流程，不追求页面外观细节点

* 后台使用node原生、express、koa2、Eggjs各开发一遍
* 前端页面使用vue、react开发
* 数据库选用mySql

为了能够快速下载和安装node_modules, 可以使用淘宝镜像地址 --registry=https://registry.npm.taobao.org

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
1 使用cookie进行用户的登录
cookie属性的设置
* expires:过期时间
* httpOnly:只能在后端设置，前端页面无法修改
* path:存在的页面地址，一般为根目录

2 使用session进行用户登录验证
cookie存储的信息太小 4kb;
由于cookie存储用户信息，会将信息暴露在外，比较危险，所以会将userId存入cookie，server端查询对应的username，用session在服务端存储用户的信息
```js
let needSetCookie= false
let userId = req.cookie.userid
if(userId){
    if(!SESSION_DATA[userId]){
        SESSION_DATA[userId] = {}
    }
}else{
    needSetCookie = true
    userId = Date.now()+"_"+Math.random()
    SESSION_DATA[userId] = {}
}
req.session = SESSION_DATA[userId]
```
session会存在问题
目前session是js变量，放在nodejs进程的内存中
* 进程内存有限，访问量增大，内存会溢出
* 正式上线后，程序是多进程的，进程之间的内存无法共享

3 使用redis存储session数据，redis内存数据库
为什么可以使用redis存储session
1 session操作频繁
2 丢失了没有损失，可以找回
3 数据量不大

网站数据不适合使用redis存储
1 操作频率不高
2 断电及其他物理原因损害，数据不能丢失，必须保留
3 数据量太大，内存成本过高
redis的安装,https://www.runoob.com/redis/redis-install.html
redis的启动：
$ redis-server
在打开另外一个cmd窗口
$ redis-cli

redis的连接
```js
const redis = require("redis")
const redisClient = redis.createClient(6379, "127.0.0.1")
redisClient.on('error', err=>{
    console.error(err);
})

redisClient.set('mykey','redisclient', redis.print)
redisClient.get('mykey', (err,val)=>{
    if(err){
        console.error(err)
        return
    }
    console.log("val", val);

    redisClient.quit()
})
```
可以将redis封装成数据接口，get和set方法，详见db>redis.js

### express框架
express是对node封装的一个后端接口处理的框架，路由的处理在routes文件夹
use执行中间件，中间件实质上是一个函数，在express中，需要传入req,res,next三个参数
主要入口文件app.js
比较重要常用的几个中间件
* cookie-parser：解析cookie对象
* express-session：处理session对象
* connect-redis： 将session存储到redis
* morgan ：日志记录

express的安装
```js
// 全局安装express-cli攻击
npm install -g express-genertaor
// 创建express项目
express express_m
```
express框架路由的使用
```js
// 获取get的参数
let id = req.query.id
// 获取post的参数
let content = req.body.content

// 处理结果最后的返回值
res.json({"msg":"请求返回的数据成功"})
// 或者返回字符串
res.send("请求返回的数据成功")
```

### koa2框架
在koa2中使用 **async** 语法处理异步回调。

koa2的安装
```js
// 全局安装koa-cli工具
npm install -g koa-genertaor
// 创建koa2项目koa_m
koa2 koa_m
```

koa2的路由管理在单独的插件中，需要单独安装koa-router
在koa2的路由中，router回调函数中ctx参数，代表着req和res
```js
// 获取get的参数
let id = ctx.query.id
// 获取post的参数
let content = ctx.request.body.content

// 处理结果最后的返回值
ctx.body = "请求返回的数据成功"
```

记录日志的插件: koa-morgan
在app.js入口文件中添加日志记录
``` js
// 日志记录
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(morgan('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  console.log("logFileName", logFileName);
  app.use(morgan('combined', {
    stream: writeStream
  }));
}
```
解析session数据：koa-generic-session
将数据存储到redis：koa-redis
session的记录，并存储入redis
``` js
app.use(session({
  // 配置cookie
  cookie:{
    path:"/",
    httpOnly:true,
    maxAge:24*60*60*1000*7
  },
  store:redisStore({
    // all:"/"
    all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))
```
### Eggjs框架



### 日志分析
使用fs模块
readFile、writeFile会一次性把文件所有内容加载至内存中操作，会造成很大的性能瓶颈，有些文件会非常大。
解决方案：使用stream
使用fs模块的createReadStream、createWriteStream流操作
分析日志采用readline逐行分析的办法
```js
const filename = path.resolve(__dirname, "../../logs/access.log")
const readStream = fs.createReadStream(filename)

const rl = readline.createInterface({
    input: readStream
})
rl.on("line", (linedata) =>{
    if(!linedata){
        return
    }
    const arr = linedata.split(" -- ")
    console.log(arr)
})
rl.on('close', ()=>{
    console.log("readline分析日志文件");
})
```
### 安全
- sql注入（窃取数据库数据）:使用mysql的escape方法将用户输入的参数转义
用户在输入的表单中使用--将sql部分注释掉，会造成非法登录等风险
解决办法
mysql.escape()

- xss跨站请求攻击（窃取前端cookie，假扮用户身份）：使用xss库，将表单输入的内容执行一下函数，xss(content),可以将<script>转为没有攻击性的文本&lt;script&gt;
转换特殊符号
& -> &amp;
< -> &lt;
> -> &gt;
" -> &quot;
' -> &#x27;
/ -> &#x2F;
使用node的xss依赖包
let content = xss(content)

- csrf跨站请求伪造（假扮被访问网站的身份）

- 密码加密:数据库禁止存放明文密码
crypto数据加密
```js
function md5(content){
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}
function generatePassword(pwd){
    const str = `password=${pwd}&key=${SECRET_KEY}`
    return md5(str)
}
console.log(generatePassword(123));
```

## 前端
### jqhtml的实现
nginx做前后端接口联调
nginx是高性能的web服务器，适合做静态服务、负载均衡
可以将jq-html的文件通过http-server启动在8001端口

反向代理通过配置nginx/conf/nginx.conf文件
``` txt
location / {
  proxy_pass  http://127.0.0.1:8001;
}
location /api/ {
  proxy_pass  http://127.0.0.1:8000;
  proxy_set_header Host $host;
}
```
然后执行测试配置文件脚本格式是否正确
nginx -t
启动nginx：nginx;
重启nginx：nginx -s reload
停止nginx ： nginx -s stop

### vue-html的实现




### react-html的实现

## 线上部署发布
PM2的安装
npm install -g pm2
查看版本
pm2 --version

PM2的进程守护，系统崩溃，会自动重启
PM2运行在后台，nodemon运行在前台

启动：pm2 start
查看任务：pm2 list
重启： pm2 restart <name/id>
停止服务： pm2 stop <name/id>
删除服务：pm2 delete <name/id>
查看服务基本信息：pm2 info <name/id>
查看服务的日志：pm2 log <name/id>
查看程序层使用服务器的信息：pm2 monit

PM2配置和写入日志功能
新建一个配置文件pm.conf.json
```json
{
  "apps":{
    "name":"pm2-server",
    "script":"app.js",
    "watch": true,
    "ignore_watch" :[
      "node_modules",
      "logs"
    ],
    "instances":4,
    "out_file":"logs/out.log",
    "error_file":"logs/error.log",
    "log_date_format":"YYYY-MM-DD HH:mm:ss"
  }
}
```
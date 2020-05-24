使用多种技术方案开发简易blog系统，只是为了走通和梳理通技术流程，不追求页面外观细节点

后台使用node原生、express、koa2、Eggjs各开发一遍

前端页面使用vue、react开发

数据库选用mySql

## 后端
- 使用node开发http请求
    1.get请求,通过querystring获取浏览器地址栏的数据a.html?a=100&b=200
```js
let query = querystring.parse(req.url.spilt("?")[1])
```
    2.post请求
```js
let postData = '';
req.on("data",(chunk)=>{
    postData += chunk.toString() //数据在浏览器传输是流的形式
})
req.on("end",()=>{
    console.log(postData);
    res.end(
        postData
    )
})
```
- 路由 > 连接数据库 > 实现登录

根据http请求的接口，设置不同的路由

### node原生





### express框架



### koa3框架
const querystring = require("querystring")
const blogRouter = require("./src/router/blog")
const userRouter = require("./src/router/user")

const serverHandle = (req,res)=>{
    // 设置数据返回的格式 JSON
    res.setHeader('content-type',"application/json")
    const url = req.url
    // 把path的值作为req的一个属性给传递下去
    req.path = url.split("?")[0]
    // 解析get请求后面的参数,可以把这个query对象添加给req的属性
    req.query = querystring.parse(url.split("?")[1])

    const blogData = blogRouter(req,res)
    const userData = userRouter(req,res)
    if(blogData){
        res.end(JSON.stringify(blogData))
        return
    }
    
    if(userData){
        res.end(JSON.stringify(userData))
        return
    }

    res.writeHead(404, {"Content-yype":"text/plain"})
    res.write("404 NOT FOUND PAGE")
    res.end('')
}

module.exports = serverHandle
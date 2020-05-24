const blogRouter = require("./src/router/blog")
const userRouter = require("./src/router/user")

const serverHandle = (req,res)=>{
    // 设置数据返回的格式 JSON
    res.setHeader('content-type',"application/json")

    const blogData = blogRouter(req,res)
    if(blogData){
        res.end(JSON.stringify(blogData))
        return
    }
    const userData = userRouter(req,res)
    if(userData){
        res.end(JSON.stringify(userData))
        return
    }

    res.writeHead(404, {"Content-yype":"text/plain"})
    res.write("404 NOT FOUND PAGE")
    res.end('')
}

module.exports = serverHandle
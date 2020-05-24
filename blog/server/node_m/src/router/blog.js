const blogRouter = (req, res)=>{
    const method = req.method
    const url = req.url
    const path = url.split("?")[0]
    // const query = url.split("?")[1]
    // 获取博客列表
    if(method ==="GET" && path === "/api/blog/list"){
        return {
            msg:"获取博客列表"
        }
    }

    // 获取博客详情
    if(method ==="GET" && path === "/api/blog/detail"){
        return {
            msg:"获取博客详情"
        }
    }

    // 新建一篇博客文章
    if(method ==="POST" && path === "/api/blog/new"){
        return {
            msg:"新建一篇博客文章"
        }
    }

    // 更新一篇博客文章
    if(method ==="POST" && path === "/api/blog/update"){
        return {
            msg:"更新一篇博客文章"
        }
    }

    // 删除一篇博客文章
    if(method ==="POST" && path === "/api/blog/del"){
        return {
            msg:"删除一篇博客文章"
        }
    }
}

module.exports = blogRouter
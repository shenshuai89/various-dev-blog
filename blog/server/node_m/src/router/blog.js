const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../control/blog")
const { SucessModel, ErrorModel } = require("../model/resModel")

// 统一登录验证函数
const loginCheck = (req)=>{
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel("尚未登录")
        )
    }
    
}

const blogRouter = (req, res) => {
    const method = req.method
    let id = req.query.id

    // 获取博客列表
    if (method === "GET" && req.path === "/api/blog/list") {
        let author = req.query.author || ""
        let keyword = req.query.keyword || ""
        // let listData = getList(author, keyword)
        // return new SucessModel(listData)
        if(req.query.isadmin){
            const loginResult = loginCheck(req)
            if(loginResult){
                return loginResult
            }
            author = req.session.username
        }
        
        const result = getList(author, keyword)
        return result.then(list=>{
            return new SucessModel(list)
        })
    }

    // 获取博客详情
    if (method === "GET" && req.path === "/api/blog/detail") {
        let result = getDetail(id)
        return result.then(detail=>{
            if(detail){
                return new SucessModel(detail)
            }else{
                return new ErrorModel("查询的这篇博客不存在")
            }
        })
    }

    // 新建一篇博客文章
    if (method === "POST" && req.path === "/api/blog/new") {
        const loginResult = loginCheck(req)
        if(loginResult){
            return loginResult
        }

        // 模拟一个假数据author
        req.body.author = req.session.username
        let result = newBlog(req.body)
        return result.then(data=>{
            return new SucessModel(data)
        })
    }

    // 更新一篇博客文章
    if (method === "POST" && req.path === "/api/blog/update") {
        console.log(req);
        const loginResult = loginCheck(req)
        if(loginResult){
            return loginResult
        }
        let result = updateBlog(id, req.body)
        return result.then(val=>{
            if(val){
                return new SucessModel()
            }else{
                return new ErrorModel("update fail")
            }
        })
        
    }

    // 删除一篇博客文章
    if (method === "POST" && req.path === "/api/blog/del") {
        const loginResult = loginCheck(req)
        if(loginResult){
            return loginResult
        }
        // const author = "张三";
        let result = delBlog(id, req.session.username)
        return result.then(res=>{
            if(res){
                return new SucessModel()
            }else{
                return new ErrorModel("删除失败")
            }
        })
        
    }
}

module.exports = blogRouter
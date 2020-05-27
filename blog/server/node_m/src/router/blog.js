const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../control/blog")
const { SucessModel, ErrorModel } = require("../model/resModel")


const blogRouter = (req, res) => {
    const method = req.method
    let id = req.query.id

    // 获取博客列表
    if (method === "GET" && req.path === "/api/blog/list") {
        let author = req.query.author || ""
        let keyword = req.query.keyword || ""
        let listData = getList(author, keyword)
        return new SucessModel(listData)
    }

    // 获取博客详情
    if (method === "GET" && req.path === "/api/blog/detail") {
        let detail = getDetail(id)
        return new SucessModel(detail)
    }

    // 新建一篇博客文章
    if (method === "POST" && req.path === "/api/blog/new") {
        let data = newBlog(req.body)
        return new SucessModel(data)
    }

    // 更新一篇博客文章
    if (method === "POST" && req.path === "/api/blog/update") {
        console.log(req);
        let result = updateBlog(id, req.body)
        if(result){
            return new SucessModel()
        }else{
            return new ErrorModel("update fail")
        }
    }

    // 删除一篇博客文章
    if (method === "POST" && req.path === "/api/blog/del") {
        let res = delBlog(id)
        if(res){
            return new SucessModel()
        }else{
            return new ErrorModel("删除失败")
        }
    }
}

module.exports = blogRouter
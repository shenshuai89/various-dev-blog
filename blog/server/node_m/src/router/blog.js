const { getList } = require("../control/blog")
const { SucessModel, ErrorModel } = require("../model/resModel")

const blogRouter = (req, res) => {
    const method = req.method
    let author = req.query.author || ""
    let keyword = req.query.keyword || ""
    let listData = getList(author, keyword) 
    // 获取博客列表
    if (method === "GET" && req.path === "/api/blog/list") {
        return new SucessModel(listData)
    }

    // 获取博客详情
    if (method === "GET" && req.path === "/api/blog/detail") {
        return {
            msg: "获取博客详情"
        }
    }

    // 新建一篇博客文章
    if (method === "POST" && req.path === "/api/blog/new") {
        return {
            msg: "新建一篇博客文章"
        }
    }

    // 更新一篇博客文章
    if (method === "POST" && path === "/api/blog/update") {
        return {
            msg: "更新一篇博客文章"
        }
    }

    // 删除一篇博客文章
    if (method === "POST" && path === "/api/blog/del") {
        return {
            msg: "删除一篇博客文章"
        }
    }
}

module.exports = blogRouter
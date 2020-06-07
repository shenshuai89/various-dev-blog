const Controller = require("egg").Controller

class BlogController extends Controller {
    async list() {
        const { ctx } = this;
        // console.log("author", ctx.query.author);
        let author = ctx.query.author || ctx.session.username || ""
        const result = await ctx.service.blog.list(author, ctx.query.keyword);
        if (result) {
            // console.log("result", result);
            ctx.body = {
                errno: 0,
                data: result
            }
        } else {
            ctx.body = {
                errno: -1,
                errMsg: "查询失败"
            }
        }
    }
    async detail() {
        const { ctx } = this;
        const result = await ctx.service.blog.detail(ctx.query.id);
        if (result) {
            ctx.body = {
                errno: 0,
                data: result
            }
        } else {
            ctx.body = {
                errno: -1,
                errMsg: "查询失败"
            }
        }
    }
    async create() {
        const { ctx } = this
        // console.log("ctx req body", ctx.request.body);
        // console.log("ctx session", ctx.session.username);
        const result = await ctx.service.blog.create({
            author: ctx.session.username,
            title: ctx.request.body.title,
            content: ctx.request.body.content
        })
        if (result) {
            ctx.body = {
                errno: 0,
                data: result
            }
        } else {
            ctx.body = {
                errno: -1,
                errMsg: "查询失败"
            }
        }
    }
    async update() {
        const { ctx } = this
        const result = await ctx.service.blog.update({
            id: ctx.query.id,
            title: ctx.request.body.title,
            content: ctx.request.body.content
        })
        if (result) {
            ctx.body = {
                errno: 0,
                message: "更新成功"
            }
        } else {
            ctx.body = {
                errno: -1,
                errMsg: "更新失败"
            }
        }
    }
    async del() {
        const { ctx } = this
        console.log("del params", ctx.query.id, ctx.session.username);
        const result = await ctx.service.blog.del({
            id: ctx.query.id,
            author: ctx.session.username
        })
        if (result) {
            ctx.body = {
                errno: 0,
                message: "删除成功"
            }
        } else {
            ctx.body = {
                errno: -1,
                errMsg: "删除失败"
            }
        }
    }
}

module.exports = BlogController
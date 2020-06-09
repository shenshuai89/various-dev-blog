const router = require("koa-router")()
const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../control/blog")
const { SucessModel, ErrorModel } = require("../model/resModel")
const loginCheck = require("../middleware/loginCheck.js")

router.prefix('/api/blog')

router.get("/list", async (ctx, next)=>{
    let author = ctx.query.author || ""
    let keyword = ctx.query.keyword || ""
    if (ctx.query.isadmin) {
        // const loginResult = loginCheck(req)
        if (!ctx.session.username) {
            console.log("未登陆");
            ctx.body = new ErrorModel("未登陆")
            return
        }
        author = ctx.session.username
    }

    const listData = await getList(author, keyword)
    ctx.body = new SucessModel(listData)
})

router.get("/detail", async (ctx, next) => {
    let resultDetail = await getDetail(ctx.query.id)
    if(resultDetail){
        ctx.body = new SucessModel(resultDetail)
    }else{
        ctx.body = new ErrorModel("查询的这篇博客不存在")
    }
})

router.post("/new", async(ctx, next) =>{
    let author = ctx.session.username
    let {title, content} = ctx.request.body
    let newResult = await newBlog({title, content, author})
    ctx.body = new SucessModel(newResult)
})

router.post("/update", async(ctx, next)=>{
    let id = ctx.query.id  || ctx.request.body.id
    let updateResult = await updateBlog(id, ctx.request.body)
    if(updateResult){
        ctx.body = new SucessModel()
    }else{
        ctx.body = new ErrorModel("更新失败")
    }
})

router.post("/del", async(ctx, next)=>{
    let id = ctx.query.id || ctx.request.body.id
    // console.log(ctx.request.body.id);
    let delResult = await delBlog(id, ctx.session.username)
    if(delResult){
        ctx.body = new SucessModel("删除成功")
    }else{
        ctx.body = new ErrorModel("删除失败")
    }
})


module.exports = router
const router = require("koa-router")()
const { login } = require("../control/user")
const { SucessModel, ErrorModel } = require("../model/resModel")

router.prefix('/api/user')

router.post("/login", async (ctx, next)=>{
    const { username, password } = ctx.request.body
    const resData = await login(username, password)

    if (resData.username) {

        // 设置session
        ctx.session.username = resData.username
        ctx.session.realname = resData.realname

        // 同步redis
        // set(req.cookie.userid, req.session)
        ctx.body = new SucessModel({ username: resData.username }, "登录成功")
        return
    }
    ctx.body = new ErrorModel("用户登录失败")

})

module.exports = router
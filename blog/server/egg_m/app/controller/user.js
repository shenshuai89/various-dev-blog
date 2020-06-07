const Controller = require("egg").Controller

class UserController extends Controller {
    async login(){
        const {ctx} = this
        // console.log("ctx req body", ctx.request.body);
        ctx.session.username = ctx.request.body.username
        const result = await ctx.service.user.login(ctx.request.body)
        if (result) {
            ctx.body = {
                errno: 0,
                data: result
            }
        } else {
            ctx.body = {
                errno: -1,
                message: "登录失败"
            }
        }
    }
}

module.exports = UserController
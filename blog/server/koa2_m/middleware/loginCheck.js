const {ErrorModel} = require("../model/resModel")

module.exports = async (ctx, next) =>{
    if(ctx.session.username){
        await next();
        console.log("登陆成功");
        return
    }
    ctx.body = new ErrorModel("未登陆")
}
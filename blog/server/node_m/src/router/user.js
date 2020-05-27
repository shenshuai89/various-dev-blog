const userRouter = (req, res)=>{
    const method = req.method

    // 用户登录接口
    if(method ==="POST" && req.path === "/api/user/login"){
        return {
            msg:"用户登录接口"
        }
    }
}

module.exports = userRouter
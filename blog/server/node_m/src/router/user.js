const userRouter = (req, res)=>{
    const method = req.method
    const url = req.url
    const path = url.split("?")[0]
    // const query = url.split("?")[1]

    // 用户登录接口
    if(method ==="POST" && path === "/api/user/login"){
        return {
            msg:"用户登录接口"
        }
    }
}

module.exports = userRouter
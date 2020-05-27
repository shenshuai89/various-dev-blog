const {login} = require("../control/user")
const {SucessModel, ErrorModel} = require("../model/resModel")

const userRouter = (req, res)=>{
    const method = req.method

    // 用户登录接口
    if(method ==="POST" && req.path === "/api/user/login"){
        let result = login("sam",123400)
        if(result){
            return new SucessModel()
        }else{
            return new ErrorModel("login fail")
        } 
    }
}

module.exports = userRouter
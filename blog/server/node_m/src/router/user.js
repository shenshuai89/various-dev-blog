const {login} = require("../control/user")
const {SucessModel, ErrorModel} = require("../model/resModel")
const {getCookieExpires} = require("../util/common")
// 设置cookie的过期时间
// const getCookieExpires = () =>{
//     const d = new Date()
//     d.setTime(d.getTime() + (24*7*60*60*1000))
//     console.log('d.toGMTString() : ',d.toGMTString());
//     return d.toGMTString()
// }

const userRouter = (req, res)=>{
    const method = req.method

    // 用户登录接口
    if(method ==="GET" && req.path === "/api/user/login"){
        // let result = login("sam",123400)
        // if(result){
        //     return new SucessModel()
        // }else{
        //     return new ErrorModel("login fail")
        // } 
        // const {username, password} = req.body
        const {username, password} = req.query
        const result = login(username, password)
        return result.then(resData=>{
            if(resData.username){
                // 设置cookie
                // res.setHeader('Set-Cookie', `username=${resData.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                // 设置session
                req.session.username = resData.username
                req.session.realname = resData.realname
                return Promise.resolve(
                    new SucessModel({username:resData.username},"登录成功")
                )
            }
            return new ErrorModel("login fail")
        })
    }
    if(method ==="GET" && req.path === "/api/user/login-test"){
        console.log(req.cookie);
        if(req.cookie.userid){
            return Promise.resolve(
                new SucessModel({
                    session:req.session
                },"登录成功")
            )
        }
    }
}

module.exports = userRouter
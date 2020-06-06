const {ErrorModel} = require("../model/resModel")

module.exports = (req, res, next) =>{
    if(req.session.username){
        next();
        console.log("登陆成功");
        return
    }
    res.json(new ErrorModel("未登陆"))
}
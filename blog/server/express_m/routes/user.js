var express = require('express');
var router = express.Router();
const { login } = require("../control/user")
const { SucessModel, ErrorModel } = require("../model/resModel")

/* GET home page. */
router.post('/login', function (req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(resData => {
        if (resData.username) {

            // 设置session
            req.session.username = resData.username
            req.session.realname = resData.realname

            // 同步redis
            // set(req.cookie.userid, req.session)
            res.json(
                new SucessModel({ username: resData.username }, "登录成功")
            )
            return
        }
        res.json(new ErrorModel("用户登录失败"))
    })
});

// router.get("/session-test", (req, res) => {
//     const session = req.session
//     if (!session.viewNum) {
//         session.viewNum = 1
//     }
//     session.viewNum++
//     res.json({
//         errno: 0,
//         data: session.viewNum
//     })
// })

module.exports = router;
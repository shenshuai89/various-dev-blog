var express = require('express');
var router = express.Router();
const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../control/blog")
const { SucessModel, ErrorModel } = require("../model/resModel")
const loginCheck = require("../middleware/loginCheck.js")

/* GET home page. */
router.get('/list', (req, res, next) => {
    let author = req.query.author || ""
    let keyword = req.query.keyword || ""
    if (req.query.isadmin) {
        // const loginResult = loginCheck(req)
        if (!req.session.username) {
            console.log("未登陆");
            res.json(new ErrorModel({
                errno: -1,
                msg: "未登陆"
            }))
            return
        }
        author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then(list => {
        res.json(
            new SucessModel(list)
        )
    })
});

router.get('/detail', (req, res, next) => {
    let result = getDetail(req.query.id)
    return result.then(detail => {
        if (detail) {
            res.json(new SucessModel(detail))
        } else {
            res.json(new ErrorModel("查询的这篇博客不存在"))
        }
    })
});

router.post("/new", loginCheck, (req, res, next) => {

    // 模拟一个假数据author
    req.body.author = req.session.username
    let result = newBlog(req.body)
    return result.then(data => {
        res.json(new SucessModel(data))
    })
})

router.post("/update", loginCheck, (req, res, next) => {
    let id = req.query.id
    let result = updateBlog(id, req.body)
    return result.then(val => {
        console.log("valvalvalval", val);
        if (val) {
            res.json(new SucessModel())
        } else {
            res.json(new ErrorModel("update fail"))
        }
    })
})

router.post("/del", loginCheck, (req, res, next) => {
    let id = req.query.id
    let result = delBlog(id, req.session.username)
    return result.then(res => {
        if (res) {
            res.json(new SucessModel())
        } else {
            res.json(new ErrorModel("update fail"))
        }
    })
})

module.exports = router;
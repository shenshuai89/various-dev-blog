const express = require("express")
const app = express()

app.use((req, res, next)=>{
    console.log("请求开始...", req.method, req.url);
    if(req.method =="GET" && req.url =="/favicon.ico"){
        return;
    }
    next()
})
// 处理cookie
app.use((req, res, next)=>{
    console.log("处理cookie");
    req.cookie = {
        userId:"abc123"
    }
    next()
})

app.use((req, res, next) =>{
    // 假设处理 post data
    // 异步
    setTimeout(() =>{
        req.body = {
            a:100,
            b:200
        }
        next()
    })
})

app.use("/api", (req,res,next)=>{
    console.log("use方式处理路由");
    next()
})
app.get("/api", (req,res,next) => {
    console.log("get方式处理路由");
    next()
})
app.post("/api", (req, res, next) => {
    console.log("post方式处理路由");
    next()
})

function loginCheck(req,res,next){
    setTimeout(()=>{
        console.log("模拟登陆失败");
        res.json({
            errno:-1,
            msg:'登陆失败，不执行向下next'
        })

        // console.log("模拟登陆成功");
        // next()
    })
}

app.get("/api/get-cookie", loginCheck,  (req,res,next) => {
    console.log("get-cookie方式处理路由");
    res.json({
        errno:0,
        data:req.cookie
    })
})
app.post("/api/post-data", (req, res, next) => {
    console.log("/api/post-data");
    res.json({
        errno:0,
        data:req.body
    })
})
app.use((req,res,next)=>{
    console.log("处理404");
    res.json({
        errno:-1,
        msg:"404 no found"
    })
})

app.listen(3600,()=>{
    console.log(`server runing on port: 3600`);
})
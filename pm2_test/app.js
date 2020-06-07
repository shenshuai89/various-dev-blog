const http = require("http")
const server = http.createServer((req,res)=>{
    res.setHeader("Content-type", "application/json")
    console.log("访问了服务");
    res.end(
        JSON.stringify({
            errno:0,
            msg:"this pm2 start server"
        })
    )
})

server.listen(8123)

console.log("服务在端口8123成功启动");
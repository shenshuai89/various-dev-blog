const http = require("http")
const querystring = require("querystring")

const server = http.createServer((req, res) => {
    const url = req.url
    const path = url.split("?")[0]
    if (req.method == "GET") {
        let query = querystring.parse(url.split("?")[1])
        console.log(req.method);
        res.end(
            JSON.stringify(req.query)
        )
    }

    if (req.method === "POST") {
        res.setHeader('content-type',"application/json")
        console.log(`req content-Type: ,`, req.headers['content-type']);
        let postData = '';
        req.on("data",(chunk)=>{
            postData += chunk.toString() //数据在浏览器传输是流的形式
        })
        req.on("end",()=>{
            console.log(postData);
            res.end(
                JSON.stringify(postData)
            )
        })
    }
})

server.listen(3000, () => {
    console.log(`http server runing in port: 3000`);

})
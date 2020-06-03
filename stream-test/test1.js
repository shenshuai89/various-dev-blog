// 输入流之间到输出流
// process.stdin.pipe(process.stdout)

// 复制文件内容到另一个文件
const fs = require("fs")
const path = require("path")
/* 
const readFilename = path.resolve(__dirname, 'data.txt')
const writeFilename = path.resolve(__dirname, 'data-bak.txt')

const readStream = fs.createReadStream(readFilename)
const writeStream = fs.createWriteStream(writeFilename)

readStream.pipe(writeStream)

readStream.on("data", chunk => {
    console.log(chunk.toString());
})

readStream.on("end", ()=>{
    console.log("work done!");
}) */

// http读取文件IO stream
const http = require("http")
let filename = path.resolve(__dirname, "data.txt")
const server = http.createServer((req,res)=>{
    if(req.method == "GET"){
        const readStream = fs.createReadStream(filename)
        readStream.pipe(res)
    }
}).listen(8666)
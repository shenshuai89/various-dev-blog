const fs = require("fs")
const path = require("path")
const readline = require("readline")

const filename = path.resolve(__dirname, "../../logs/access.log")
// read stream
const readStream = fs.createReadStream(filename)

// 创建readline对象
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0;
let sum = 0;
rl.on("line", (linedata) =>{
    if(!linedata){
        return
    }
    sum++
    const arr = linedata.split(" -- ")
    if(arr[2]&& arr[2].indexOf("Chrome") > 0){
        chromeNum ++
    }
})

rl.on('close', ()=>{
    console.log("Chrome占比：", chromeNum/sum);
})
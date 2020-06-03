const fs = require("fs")
const path = require("path")

let filename = path.resolve(__dirname,"./text.txt")

// 读取文件内容
// fs.readFile(filename, (err, data)=>{
//     if(err){
//         console.error(err);
//         return
//     }
//     // data为二进制
//     console.log(data.toString())
// })

// 写入内容
let opt = {
    flag:"a" //a表示追加append，w表示写入write
}

fs.writeFile(filename, "添加一段新写入的内容\n",opt, (err)=>{
    if(err){
        console.error(err);
        return
    }
})

// 判断文件是否存在
fs.exists(filename, (exist)=>{
    console.log("文件是否存在", exist);
})
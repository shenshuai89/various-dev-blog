const fs = require("fs")
const path = require("path")

fs.readFile(path.resolve(__dirname,"./text.txt"), (err, data)=>{
    if(err){
        console.error(err);
        return
    }
    // data为二进制
    console.log(data.toString())
})
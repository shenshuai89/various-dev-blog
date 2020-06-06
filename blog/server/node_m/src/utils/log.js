const fs = require("fs")
const path = require("path")

function createWriteStream(filename){
    const fullFilename = path.join(__dirname, "../", "../", "logs", filename)
    const writeStream = fs.createWriteStream(fullFilename, {
        flags:"a"
    })
    return writeStream
}

// 写入日志
const accessWriteStream = createWriteStream("access.log")
function access(log){
    console.log(log);
    accessWriteStream.write(log+"\n")
}

module.exports = {
    access
}
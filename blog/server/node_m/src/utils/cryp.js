const crypto = require("crypto")

// 定义秘钥
const SECRET_KEY = "SKORN&(*_+lkfd265dfaJKFI"

function md5(content){
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

function generatePassword(pwd){
    const str = `password=${pwd}&key=${SECRET_KEY}`
    return md5(str)
}

// console.log(generatePassword(123));
module.exports ={
    generatePassword
}
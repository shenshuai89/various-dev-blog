const {exec, escape} = require("../db/mysql")
const {generatePassword} = require("../utils/cryp")

const login =(username, password)=>{
    // 明文密码123
    password = generatePassword(password)
    username = escape(username)
    password = escape(password)
    const sql = `select username, realname from users where username=${username} and password=${password}`
    
    // if(username=="sam"&&password==123){
    //     return true
    // }
    return exec(sql).then(res=>{
        return res[0] || {}
    })
}

module.exports = {
    login
}
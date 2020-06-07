const Service = require("egg").Service
const crypto = require('crypto');

class UserService extends Service{
    async login(obj){
        if(!obj){
            console.log("id必须存在");
            return null
        }
        // title, content, author, createtime
        let createtime = Date.now()
        let author = "zhangsan"
        const SECRET_KEY = "SKORN&(*_+lkfd265dfaJKFI"
        // password=${pwd}&key=${SECRET_KEY}
        let password = `password=${obj.password}&key=${SECRET_KEY}`
        password = crypto.createHash('md5').update(password).digest('hex');
        try{
            return await this.app.mysql.get("users",{
                password,
                username:obj.username
            })
        }catch(err){
            console.log(err);
            return null
        }
    }
}

module.exports = UserService
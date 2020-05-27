const login =(username, password)=>{
    if(username=="sam"&&password==123456){
        return true
    }
    return false
}

module.exports = {
    login
}
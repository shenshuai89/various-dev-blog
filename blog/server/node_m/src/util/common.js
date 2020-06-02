const getCookieExpires = () =>{
    const d = new Date()
    d.setTime(d.getTime() + (24*7*60*60*1000))
    console.log('d.toGMTString() : ',d.toGMTString());
    return d.toGMTString()
}

module.exports = {
    getCookieExpires
}
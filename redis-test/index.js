const redis = require("redis")
const redisClient = redis.createClient(6379, "127.0.0.1")
redisClient.on('error', err=>{
    console.error(err);
})

redisClient.set('mykey','redisclient', redis.print)
redisClient.get('mykey', (err,val)=>{
    if(err){
        console.error(err)
        return
    }
    console.log("val", val);

    redisClient.quit()
})
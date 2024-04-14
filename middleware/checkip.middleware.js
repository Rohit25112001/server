const axios = require('axios');

const checkip = async(req, res, next)=>{
    try{
        
        const {data:{ip}} = await axios.get('https://api.ipify.org?format=json')

        if(ip !== process.env.STATIC_IP) return res.status(403).json({success:false})

        next();
    }
    catch(err){
        res.status(500).json({success:false})
    }
}
module.exports = checkip

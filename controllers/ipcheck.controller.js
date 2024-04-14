const axios = require('axios');
const jwt = require('jsonwebtoken');

// const ipMatch = ['122.180.179.228']

// const checkip = async(req,res,next)=>{
//     try{
//         const {data:{ip}} = await axios.get('https://api.ipify.org?format=json')

//         if(!ipMatch.includes(ip)) return res.status(403).json({success:false})

//         next();
//     }
//     catch(err){
//         return res.status(500).json({success:false})
//     }
// }
// module.exports = checkip
const checkip = async(req, res)=>{
    try{
        
        const {data:{ip}} = await axios.get('https://api.ipify.org?format=json')

        if(ip !== process.env.STATIC_IP) return res.status(403).json({success:false})

        res.status(200).json({success:true})
    }
    catch(err){
        res.status(500).json({success:false})
    }
}
module.exports = checkip
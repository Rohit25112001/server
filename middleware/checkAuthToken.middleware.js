const express = require('express');
const router = express.Router();

router.get('/', async(req, res, next) => {
    try{
        const token = await req.cookies['at'];
        
        if(token) return next();

        // res.clearCookie('rt');
        res.status(401).json({success:false})
    }

    catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
})

module.exports = router;
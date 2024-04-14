const express = require('express');
const router = express.Router();

router.get('/', async(req, res, next) => {
    try{
        const token = await req.cookies['art'];
        
        if(token) return next();

        res.status(401).json({success:false})
    }

    catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
})

module.exports = router;
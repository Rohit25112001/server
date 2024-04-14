const express = require('express');
const router = express.Router();

router.get('/', async(req, res, next) => {
    try{
        const token_rt = req.cookies['rt'];

        if (!token_rt) return res.status(401).json({ success: false });

        next();
    }

    catch(err){
        console.log(err)
        res.status(401).json({success:false})
    }
})

module.exports = router;
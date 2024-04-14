const express = require('express');
const router = express.Router();

router.get('/',(req, res)=>{
    // const session = jwt.sign(payload(user),process.env.DATA_SECRET_KEY);
    res.cookie('testing','hello',{
        httpOnly:true,
            maxAge:604800000,
            secure:true
    })
    res.status(200).json({message:'testing'})
})

module.exports = router;
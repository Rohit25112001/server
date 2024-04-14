const express = require('express');
const checkAuthToken = require('../middleware/checkAuthToken.middleware');
const router = express.Router();

router.get('/',function(req,res){
    res.status(200).json({success:true})
})

module.exports = router;
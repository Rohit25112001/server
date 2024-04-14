const Admin = require('../../schema/admin.schema.js');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const getCookies = require('../../modules/cookie.module.js');

const getPayload = (admin) =>{
    return{
        id:admin._id,
        username:admin.username,
        email:admin.email,
        mobile:admin.mobile 
        ? String(admin.mobile).replace(/.*(?=\d{2})/, '********') 
        : null,
        createdAt:admin.createdAt
    }
}

const create = async (req, res) =>{
    try{
        const admin = new Admin(req.body);
        await admin.save();
        res.status(200).json({success:true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false})
    }
}

const login = async (req, res) =>{
    try{
        const admin = await Admin.findOne({email:req.query.email});
        
        if(!admin) return res.status(404).json({success:false});

        const checkPass = await bcrypt.compare(req.query.password, admin.password);

        if(!checkPass) return res.status(401).json({success:false});
        // getPayload(admin)
        // console.log(admin)
        // console.log(String(admin.mobile).replace(/\d(?=1\d{2})/g, '*'))
        // console.log(getPayload(admin))
        const session = jwt.sign(getPayload(admin),process.env.DATA_SECRET_KEY);
        const {aat, art} = getCookies(['aat','art'],'all', process.env.SECRET_ADMIN, admin)
        const currentTime = moment();
        currentTime.add(12, 'minutes');
        const current_time = btoa(currentTime);
        // console.log(session)
        // console.log(art)
        res.cookie('art',art,{
            httpOnly:true,
            maxAge:604800000,
            secure:false
        })
    
        res.cookie('aat',aat,{
            httpOnly:true,
            maxAge:900000,
            secure:false
        })
        res.status(200).json({data:session,time:current_time})
        // const admin = new Admin(req.body);
        // await admin.save();
        // res.status(200).json({success:true})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false})
    }
}

module.exports = { create, login}
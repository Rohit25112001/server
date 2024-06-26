const User = require('../../schema/user.schema');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const moment = require('moment');

const getCookies = require('../../modules/cookie.module');

const signup = async (req, res) =>{
    try{
        const user = new User(req.body);
        await user.save();

        const {at , rt} = getCookies(undefined, 'all', process.env.DATA_SECRET_KEY ,user); // calling from cookie module

        res.cookie('rt',rt,{
            httpOnly:true,
            maxAge:604800000,
            secure:true,
            sameSite:'none'
        })
    
        res.cookie('at',at,{
            httpOnly:true,
            maxAge:900000,
            secure:true,
            sameSite:'none'
        })
    
        res.status(200).json({success:true})
    }
    catch(err){
        res.status(500).json({success:false})
    }
}

const login = async (req, res) => {
    // const user = await User.findOne({email:req.query.email},{createdAt:0,updatedAt:0,__v:0});
    // try{
    //     const user = await User.findOne({email:req.query.email});
    //     res.cookie('testing', 'hello', {
    //         httpOnly: true,
    //         maxAge: 604800000, 
    //         sameSite: 'none', 
    //         secure: true 
    //     });
    //     res.status(200).json({data:user})
    // }
    // catch(err){
    //     res.status(400).json({message:err.message})
    // }
    try{
        const user = await User.findOne({email:req.query.email},{createdAt:0,updatedAt:0,__v:0});

        if(!user) return res.status(404).json({success:false})

        const checkPass = bcrypt.compare(req.query.password,user.password);

        if(!checkPass) return res.status(401).json({success:false})

        const payload = (user) => {
            return {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
                mobile: String(user.mobile).replace(/\d(?=1\d{2})/g, '*'),
                createdAt: user.createdAt,
            };
        };
        
        const session = jwt.sign(payload(user),process.env.DATA_SECRET_KEY);
        const {at , rt} = getCookies(undefined, 'all', process.env.DATA_SECRET_KEY ,user); // calling from cookie module

        res.cookie('rt',rt,{
            httpOnly:true,
            maxAge:604800000,
            sameSite:'none',
            secure:true
        })
    
        res.cookie('at',at,{
            httpOnly:true,
            maxAge:900000,
            sameSite:'none',
            secure:true
        })
        const currentTime = moment();
        currentTime.add(12, 'minutes');
        const current_time = btoa(currentTime);
        console.log(current_time);
        res.status(200).json({data:session,time:current_time})
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false,message: 'Internal Server Error' })
    }
}

const logout =  (req, res) =>{
    try{
        res.clearCookie('at');
        res.clearCookie('rt');
        res.status(200).json({success:true})
    }
    catch(err){
        console.log(err);
    }
}

const remove =  () => {
    try{
        console.log('remove');
    }
    catch(err){
        console.log(err)
    }
}

module.exports = { signup, login, logout, remove }
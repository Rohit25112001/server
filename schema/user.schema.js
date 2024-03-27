const mongoose = require('mongoose');
const bcrypt= require('bcrypt');
const userModel = new mongoose.Schema({
    fullname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    mobile:{type:Number,required:true},
    term_cond:{type:Boolean,required:true},
    createdAt:{type:Date,default:Date.now()},
    updatedAt:{type:Date,default:Date.now()}
})

userModel.pre('save',async function(next){
    const existingUser = await User.findOne({ email: this.email });
    
    if(!existingUser) return next();
    
    throw new Error('User with this email already exists');
})

userModel.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password.toString(),12)
    next();
});

const User = mongoose.model('User',userModel);
module.exports = User;
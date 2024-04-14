const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminModel  = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    mobile:{type:String,required:true},
    createdAt:{type:Date, default:Date.now()},
    updatedAt:{type:Date, default:Date.now()}
});

adminModel.pre('save', async function(next){
    const existingAdmin =  await Admin.countDocuments();
    
    if(existingAdmin) throw new Error('Admin already exist')

    next();
});

adminModel.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password.toString(),12);
    next();
});


const Admin = mongoose.model('Admin', adminModel)
module.exports = Admin;
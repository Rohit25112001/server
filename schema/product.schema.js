const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    productName:{type:String,required:true},
    productImage:[String],
    description:{type:String,required:true},
    category:{type:String,required:true},
    color:{type:[String],required:true},
    discount:{type:Number,required:true},
    keyword:{type:[String],required:true},
    quantity:{type:Number,required:true},
    rentPrice:{type:Number,required:true},
    securityDeposite:{type:Number,required:true},
    createdAt:{type:Date, default:Date.now()},
    updatedAt:{type:Date, default:Date.now()}
});

const Product = mongoose.model('Product',productModel);

module.exports = Product;
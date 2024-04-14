const Product = require("../../schema/product.schema")

//fetch product
const fetchProduct = async (req, res) => {
    try{
        const { limit, page } = req.query;
        const skip = (page - 1) * limit; // skip page
        const totalDocuments  = await Product.countDocuments(); //total product
        const products = await Product.find().skip(skip).limit(limit);
        res.status(200).json({data:products,total:totalDocuments})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false})
    }
}

//add product
const addProduct = async (req, res) => {
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(200).json({data:product})
    }
    catch(err){
        console.log(err)
        res.status(500).json({success:false})
    }
}

//update product
const uploadProduct = async( req, res ) => {
    const product = await Product.updateOne({_id:req.params.id}, {productImage:req.body.key})
    // console.log(req.params.id )
    // console.log(req.body,'testing')
    // console.log(product)
    res.status(200).json({success:true});
}

//delete product
const deleteProduct = async (req, res) => {
    try{
        const a = await Product.deleteOne({_id:req.params.id});
        console.log(a,req.params)
        res.status(200).json({success:true});
    }
    catch(err){
        console.log(err);
        res.status(500).json({success:false});
    }
}

module.exports = { addProduct, fetchProduct, deleteProduct, uploadProduct }
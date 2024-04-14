const express = require('express');
const router = express.Router();

const { fetchProduct, addProduct, uploadProduct, deleteProduct} = require('../controllers/product/product.controller');

router.get('/get-product',fetchProduct);
router.post('/add-product', addProduct);
router.put('/update/:id', uploadProduct);
router.delete('/remove-product/:id', deleteProduct);
// router.delete('/remove-product/:id', router.get('/update', uploadProduct););

module.exports = router;
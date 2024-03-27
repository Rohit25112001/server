const express = require('express');
const router = express.Router();

const { fetchProduct, addProduct, deleteProduct} = require('../controllers/product.controller');

router.get('/get-product', fetchProduct);
router.post('/add-product', addProduct);
router.delete('/remove-product/:id', deleteProduct);

module.exports = router;
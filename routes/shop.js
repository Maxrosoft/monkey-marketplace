const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getProducts);
router.get('/products', shopController.getProducts);
router.get('/shop', shopController.getProductDetails);
router.get('/cart', shopController.getCart);

router.post('/add-to-cart', shopController.postAddToCart);
router.post('/cart/delete', shopController.postDeleteFromCart);


module.exports = router;

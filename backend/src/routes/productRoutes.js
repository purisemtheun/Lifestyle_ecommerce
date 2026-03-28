const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// เมื่อเรียก GET /api/products จะไปทำงานที่ controller
router.get('/', productController.getProducts);

module.exports = router;
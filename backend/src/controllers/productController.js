const Product = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: "เกิดข้อผิดพลาดในการดึงข้อมูลจากฐานข้อมูล" 
    });
  }
};

module.exports = { getProducts };
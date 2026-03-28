const Product = require('../models/productModel');

// 🟢 ดึงรายการสินค้าทั้งหมด
const getProducts = async (req, res) => {
  try {
    const { category, sort, search } = req.query;
    const products = await Product.getAll(category, sort, search);
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🟢 ดึงรายละเอียดสินค้าตาม ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id); // เรียกใช้ฟังก์ชันจาก Model
    
    if (!product) {
      return res.status(404).json({ success: false, message: "ไม่พบสินค้าในระบบ" });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("Error in getProductById:", error);
    res.status(500).json({ success: false, message: "DB Error" });
  }
};

// อย่าลืมส่งออกทั้ง 2 ฟังก์ชันนะครับ
module.exports = { getProducts, getProductById };
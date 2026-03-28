const pool = require('../db');

const Product = {
  // ฟังก์ชันดึงสินค้าทั้งหมด
  getAll: async () => {
    // ใช้คำสั่ง SQL SELECT เพื่อดึงข้อมูลจากตาราง products
    const query = 'SELECT * FROM products ORDER BY id ASC';
    const result = await pool.query(query);
    return result.rows; // คืนค่าเป็น Array ของสินค้า
  }
};

module.exports = Product;
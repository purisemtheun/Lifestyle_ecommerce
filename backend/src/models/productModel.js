const pool = require('../db');

const Product = {
  // 🟢 ดึงข้อมูลทั้งหมด + ค้นหา + เรียงลำดับ
  getAll: async (category, sort, search) => {
    let query = 'SELECT * FROM products';
    let values = [];
    let conditions = [];

    if (category && category !== 'all') {
      conditions.push(`category = $${values.length + 1}`);
      values.push(category);
    }

    if (search) {
      conditions.push(`name ILIKE $${values.length + 1}`);
      values.push(`%${search}%`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    if (sort === 'price_asc') query += ' ORDER BY price ASC';
    else if (sort === 'price_desc') query += ' ORDER BY price DESC';
    else query += ' ORDER BY id DESC';

    const result = await pool.query(query, values);
    return result.rows;
  },

  // 🟢 ดึงข้อมูลสินค้าชิ้นเดียวตาม ID (ส่งแค่ข้อมูลกลับไป)
  getById: async (id) => {
    const query = 'SELECT * FROM products WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0]; // ส่งผลลัพธ์แถวแรกกลับไป
  }
};

module.exports = Product;
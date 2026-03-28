const { Pool } = require('pg');

// ใส่ข้อมูลการเชื่อมต่อฐานข้อมูลของคุณตรงนี้
const pool = new Pool({
  user: 'postgres',          
  host: 'localhost',        
  database: 'lifestyle_db', 
  password: 'admin',
  port: 5432,
});

module.exports = pool;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
// ดึง Stripe client จากตัวแปรสภาพแวดล้อม แทนการ hardcode คีย์ในโค้ด
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// 👇 เพิ่มบรรทัดนี้เพื่อดึง Routes ของสินค้าเข้ามา 👇
const productRoutes = require("./routes/productRoutes"); 
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// ในไฟล์ server.js ตรง API /api/checkout/create-session
app.post('/api/checkout/create-session', async (req, res) => {
  try {
    const { items } = req.body;

    // ตรวจสอบก่อนว่ามีของในตะกร้าส่งมาจริงไหม
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'ไม่มีสินค้าในตะกร้า' });
    }

    // 🟢 2. ปรับการ Map ข้อมูลให้ปลอดภัยขึ้น
    const line_items = items.map(item => {
      // ป้องกันเรื่องราคาเป็น String (Stripe ต้องการจำนวนเต็มเท่านั้น)
      const unitAmount = Math.round(parseFloat(item.price) * 100);
      
      return {
        price_data: {
          currency: 'thb',
          product_data: {
            name: item.name,
            // ถ้าไม่แน่ใจเรื่องรูป ให้ลองคอมเมนต์บรรทัด images นี้ออกก่อนเพื่อเทสว่าผ่านไหม
            // images: [`http://localhost:5173/products/${item.image}`], 
          },
          unit_amount: unitAmount,
        },
        quantity: parseInt(item.quantity),
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cart',
    });

    // ส่ง URL กลับไปให้หน้าบ้านวาร์ป
    res.json({ url: session.url });

  } catch (error) {
    // 🟢 3. พิมพ์ Error ออกมาดูที่ Terminal ของ Backend ว่ามันบ่นเรื่องอะไร
    console.error('Stripe Error:', error.message); 
    res.status(500).json({ error: error.message });
  }
});


// test DB
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ใช้งาน Routes ที่ Import มา
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

const PORT = 3001; // รันที่พอร์ต 3001 ตามที่คุณตั้งไว้

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
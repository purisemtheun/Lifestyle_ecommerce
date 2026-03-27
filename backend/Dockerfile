# 1. ใช้ Node.js version 20
FROM node:20-alpine

# 2. สร้างโฟลเดอร์ทำงานใน Docker
WORKDIR /app

# 3. ก๊อปปี้ไฟล์ package.json ไปลงก่อนเพื่อติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# 4. ก๊อปปี้โค้ดทั้งหมดในเครื่องเราเข้าไปใน Docker
COPY . .

# 5. เปิดพอร์ต 3000
EXPOSE 3000

# 6. สั่งให้รัน server
CMD ["npm", "run", "dev"]
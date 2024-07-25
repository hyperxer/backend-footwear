// middlewares/upload.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'imgproducts/'); // กำหนดโฟลเดอร์สำหรับเก็บรูปภาพ
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // ตั้งชื่อไฟล์ด้วย uniqueSuffix
  }
});

const upload = multer({ storage: storage });

module.exports = upload;

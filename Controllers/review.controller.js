// controllers/review.controller.js
const db = require("../Models");
const Review = db.review;
const Product = db.product;

exports.create = async (req, res) => {
  const { productId, rating, comment } = req.body;

  try {
    // ตรวจสอบว่า productId มีอยู่ในตาราง products
    const productExists = await Product.findByPk(productId);
    if (!productExists) {
      return res.status(400).send({ message: `Product ID ${productId} does not exist` });
    }

    // สร้างรีวิว
    const review = await Review.create({ productId, rating, comment });
    res.send({ message: "Review created successfully!", review });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  const { productId } = req.params;

  try {
    // ดึงรีวิวที่เชื่อมโยงกับ productId
    const reviews = await Review.findAll({ where: { productId } });
    
    if (reviews.length === 0) {
      return res.status(404).send({ message: "No reviews found for this product" });
    }

    res.send(reviews);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

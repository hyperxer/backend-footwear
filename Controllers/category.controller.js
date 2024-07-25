// controllers/category.controller.js
const db = require("../Models");
const Category = db.category;

exports.create = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name
    });
    res.status(201).send(category);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// controllers/category.controller.js
exports.findAll = async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).send(categories);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  // controllers/category.controller.js
exports.findOne = async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).send({ message: "Category not found" });
      }
      res.status(200).send(category);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
  
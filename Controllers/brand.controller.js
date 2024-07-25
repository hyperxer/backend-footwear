// controllers/brand.controller.js
const db = require("../Models");
const Brand = db.brand;

exports.create = async (req, res) => {
  try {
    const brand = await Brand.create({
      name: req.body.name
    });
    res.status(201).send(brand);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// controllers/brand.controller.js
exports.findAll = async (req, res) => {
    try {
      const brands = await Brand.findAll();
      res.status(200).send(brands);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  
// controllers/brand.controller.js
exports.findOne = async (req, res) => {
    try {
      const brand = await Brand.findByPk(req.params.id);
      if (!brand) {
        return res.status(404).send({ message: "Brand not found" });
      }
      res.status(200).send(brand);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
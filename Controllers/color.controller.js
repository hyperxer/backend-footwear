// controllers/brand.controller.js
const db = require("../Models");
const Color = db.color;

exports.create = async (req, res) => {
  try {
    const color = await Color.create({
      name: req.body.name
    });
    res.status(201).send(color);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// controllers/brand.controller.js
exports.findAll = async (req, res) => {
    try {
      const color = await Color.findAll();
      res.status(200).send(color);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  
// controllers/brand.controller.js
exports.findOne = async (req, res) => {
    try {
      const color = await Color.findByPk(req.params.id);
      if (!color) {
        return res.status(404).send({ message: "Color not found" });
      }
      res.status(200).send(color);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
  
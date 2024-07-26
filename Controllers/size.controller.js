// controllers/brand.controller.js
const db = require("../Models");
const Size = db.size;

exports.create = async (req, res) => {
    try {
        const size = await Size.create({
            name: req.body.value
        });
        res.status(201).send(size);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


// controllers/brand.controller.js
exports.findAllMale = async (req, res) => {
    try {
        const size = await Size.findAll({
            where: {
                gender: 'male'
            }
        });
        res.status(200).send(size);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.findAllfemale = async (req, res) => {
    try {
        const size = await Size.findAll({
            where: {
                gender: 'female'
            }
        });
        res.status(200).send(size);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


// controllers/brand.controller.js
exports.findOne = async (req, res) => {
    try {
        const size = await Size.findByPk(req.params.id);
        if (!size) {
            return res.status(404).send({ message: "Size not found" });
        }
        res.status(200).send(size);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

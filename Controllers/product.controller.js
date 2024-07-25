// // controllers/product.controller.js
// const db = require("../Models");
// const Product = db.product;

// exports.create = (req, res) => {
//   if (!req.body.name || !req.body.price) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//   }

//   const product = {
//     name: req.body.name,
//     detail: req.body.detail,
//     price: req.body.price
//   };

//   Product.create(product)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while creating the Product."
//       });
//     });
// };

// exports.findAll = (req, res) => {
//   Product.findAll()
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving products."
//       });
//     });
// };

// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Product.findByPk(id)
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Product with id=${id}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Product with id=" + id
//       });
//     });
// };

// exports.update = (req, res) => {
//   const id = req.params.id;

//   Product.update(req.body, {
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Product was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Product with id=" + id
//       });
//     });
// };

// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Product.destroy({
//     where: { id: id }
//   })
//     .then(num => {
//       if (num == 1) {
//         res.send({
//           message: "Product was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Product with id=" + id
//       });
//     });
// };


// controllers/product.controller.js
const db = require("../Models");
const Product = db.product;
const Size = db.size;
const ProductSize = db.productSize;
const Color = db.color;
const ProductColor = db.productColor;

exports.create = async (req, res) => {
  const { name, detail, price, brandId, categoryId, sizes , colors } = req.body; // sizes เป็น array ของ object { sizeId, quantity }

  try {
    const product = await Product.create({ name, detail, price, brandId, categoryId });

    for (let size of sizes) {
      await ProductSize.create({
        productId: product.id,
        sizeId: size.sizeId,
        quantity: size.quantity
      });
    }

    for (let color of colors) {
      // ตรวจสอบว่า colorId มีอยู่ในตาราง colors
      const colorExists = await Color.findByPk(color.colorId);
      if (!colorExists) {
        return res.status(400).send({ message: `Color ID ${color.colorId} does not exist` });
      }

      await ProductColor.create({
        productId: product.id,
        colorId: color.colorId
      });
    }
    

    res.send({ message: "Product created successfully!", product });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id, {
    include: [
      { model: Size, through: { attributes: ['quantity'] } } // ดึงข้อมูลไซส์และจำนวนสินค้า
    ]
  })
    .then(product => {
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.send(product);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
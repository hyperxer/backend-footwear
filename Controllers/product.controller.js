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
const Brand = db.brand;
const Category = db.category;

exports.create = async (req, res) => {
  const { name, detail, price, brandId, categoryId, sizes , colors, gender } = req.body; // sizes เป็น array ของ object { sizeId, quantity }
  const prod_img = req.file ? req.file.filename : null;

  try {
    const product = await Product.create({ name, detail, price, brandId, categoryId , prod_img , gender });

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

// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Product.findByPk(id, {
//     include: [
//       { model: Size, through: { attributes: ['quantity'] } } // ดึงข้อมูลไซส์และจำนวนสินค้า
//     ]
//   })
//     .then(product => {
//       if (!product) {
//         return res.status(404).send({ message: "Product not found" });
//       }
//       res.send(product);
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// };

exports.getProductDetails = async (req, res) => {
  const { productId, sizeId, colorId } = req.query; // ใช้ query parameters

  try {
    // ค้นหาขนาดที่ระบุ
    const size = await Size.findOne({ where: { id: sizeId } });
    if (!size) {
      return res.status(404).send({ message: `Size ${sizeId} not found` });
    }

    // ค้นหาสีที่ระบุ
    const color = await Color.findOne({ where: { id: colorId } });
    if (!color) {
      return res.status(404).send({ message: `Color ${colorId} not found` });
    }

    // ค้นหาจำนวนสินค้าตามขนาดและสีที่ระบุ
    const productSize = await ProductSize.findOne({ 
      where: { productId, sizeId: size.id }
    });

    if (!productSize) {
      return res.status(404).send({ message: `Product with size ${sizeName} not found for product ID ${productId}` });
    }

    const productColor = await ProductColor.findOne({ 
      where: { productId, colorId: color.id }
    });

    if (!productColor) {
      return res.status(404).send({ message: `Product with color ${colorName} not found for product ID ${productId}` });
    }

    // ส่งข้อมูลกลับ
    res.send({
      productId,
      sizeName,
      colorName,
      quantity: productSize.quantity
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// ดึงข้อมูลสินค้าทั้งหมด
exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Size, through: { attributes: ['quantity'] }, as: 'sizes' },
        { model: Color, as: 'colors' }
      ]
    });
    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findAllMale = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { gender: 'male' },
      include: [
        { model: Size, through: { attributes: ['quantity'] }, as: 'sizes' },
        { model: Color, as: 'colors' }
      ]
    });
    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findAllFemale = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { gender: 'female' },
      include: [
        { model: Size, through: { attributes: ['quantity'] }, as: 'sizes' },
        { model: Color, as: 'colors' }
      ]
    });
    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// ดึงข้อมูลสินค้าตาม ID
exports.findOne = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({
      where: { id },
      include: [
        { model: Size, through: { attributes: ['quantity'] }, as: 'sizes' },
        { model: Color, as: 'colors' }
      ]
    });

    if (!product) {
      return res.status(404).send({ message: `Product with ID ${id} not found` });
    }

    res.send(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// exports.search = async (req, res) => {
//   const { brandId, colorIds, sizeIds, categoryId } = req.query;

//   try {
//     const queryOptions = {
//       include: [
//         { model: Size, through: { attributes: ['quantity'] }, as: 'sizes' },
//         { model: Color, as: 'colors' }
//       ],
//       where: {}
//     };

//     if (brandId) {
//       queryOptions.where.brandId = brandId;
//     }

//     if (categoryId) {
//       queryOptions.where.categoryId = categoryId;
//     }

//     const products = await Product.findAll(queryOptions);

//     // Filter products by color and size if provided
//     const filteredProducts = products.filter(product => {
//       let match = true;

//       if (colorIds) {
//         const colorIdsArray = colorIds.split(',').map(Number);
//         match = product.colors.some(color => colorIdsArray.includes(color.id));
//       }

//       if (sizeIds) {
//         const sizeIdsArray = sizeIds.split(',').map(Number);
//         match = match && product.sizes.some(size => sizeIdsArray.includes(size.id));
//       }

//       return match;
//     });

//     res.send(filteredProducts);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };


// exports.search = async (req, res) => {
//   const { brandId, categoryId, colorIds, sizeIds } = req.query;

//   try {
//     const queryOptions = {
//       include: [
//         {
//           model: ProductSize,
//           as: 'productSizes',
//           include: [
//             {
//               model: Size,
//               as: 'size'
//             }
//           ]
//         },
//         {
//           model: ProductColor,
//           as: 'productColors',
//           include: [
//             {
//               model: Color,
//               as: 'color'
//             }
//           ]
//         }
//       ],
//       where: {}
//     };

//     // Apply filters if they exist
//     if (brandId) {
//       queryOptions.where.brandId = brandId;
//     }

//     if (categoryId) {
//       queryOptions.where.categoryId = categoryId;
//     }

//     const products = await Product.findAll(queryOptions);

//     // Filter products by color and size if provided
//     const filteredProducts = products.filter(product => {
//       let match = true;

//       if (colorIds) {
//         const colorIdsArray = colorIds.split(',').map(Number);
//         match = product.productColors.some(productColor => colorIdsArray.includes(productColor.color.id));
//       }

//       if (sizeIds) {
//         const sizeIdsArray = sizeIds.split(',').map(Number);
//         match = match && product.productSizes.some(productSize => sizeIdsArray.includes(productSize.size.id));
//       }

//       return match;
//     });

//     res.send(filteredProducts);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

exports.search = async (req, res) => {
  const { brandId, categoryId, colorId, sizeId } = req.query;

  try {
    let queryOptions = {
      include: []
    };

    // Filter by brandId and categoryId
    if (brandId) {
      queryOptions.where = { ...queryOptions.where, brandId };
    }

    if (categoryId) {
      queryOptions.where = { ...queryOptions.where, categoryId };
    }

    // Include colors if colorId is provided
    if (colorId) {
      queryOptions.include.push({
        model: Color,
        as: 'colors',
        where: { id: colorId },
        through: { attributes: [] } // Exclude the join table attributes
      });
    }

    // Include sizes if sizeId is provided
    if (sizeId) {
      queryOptions.include.push({
        model: Size,
        as: 'sizes',
        where: { id: sizeId },
        through: { attributes: [] } // Exclude the join table attributes
      });
    }

    // Fetch products based on the query options
    const products = await Product.findAll(queryOptions);

    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


// ในไฟล์ product.controller.js
exports.findBySize = async (req, res) => {
  const { sizeId } = req.params;

  try {
    const products = await Product.findAll({
      include: [
        {
          model: Size,
          as: 'sizes',
          where: { id: sizeId },
          through: { attributes: ['quantity'] } // รวม quantity จากตารางเชื่อมโยง
        },
        {
          model: Color,
          as: 'colors'
        }
      ]
    });

    if (products.length === 0) {
      return res.status(404).send({ message: `No products found with size ID ${sizeId}` });
    }

    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.findBySizeAndColor = async (req, res) => {
  const { sizeId, colorId } = req.query;

  try {
    let queryOptions = {
      include: []
    };

    // Include sizes if sizeId is provided
    if (sizeId) {
      queryOptions.include.push({
        model: Size,
        as: 'sizes',
        where: { id: sizeId },
        through: { attributes: ['quantity'] } // Include quantity from the join table
      });
    }

    // Include colors if colorId is provided
    if (colorId) {
      queryOptions.include.push({
        model: Color,
        as: 'colors',
        where: { id: colorId },
        through: { attributes: [] } // Exclude the join table attributes
      });
    }

    // Fetch products based on the query options
    const products = await Product.findAll(queryOptions);

    if (products.length === 0) {
      return res.status(404).send({ message: `No products found with the provided size and color` });
    }

    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.findBySizeColorBrandAndCategory = async (req, res) => {
  const { sizeId, colorId, brandId, categoryId } = req.query;

  try {
    let queryOptions = {
      include: []
    };

    // Include sizes if sizeId is provided
    if (sizeId) {
      queryOptions.include.push({
        model: Size,
        as: 'sizes',
        where: { id: sizeId },
        through: { attributes: ['quantity'] } // Include quantity from the join table
      });
    }

    // Include colors if colorId is provided
    if (colorId) {
      queryOptions.include.push({
        model: Color,
        as: 'colors',
        where: { id: colorId },
        through: { attributes: [] } // Exclude the join table attributes
      });
    }

    // Add brandId to the where clause if provided
    if (brandId) {
      if (!queryOptions.where) queryOptions.where = {};
      queryOptions.where.brandId = brandId;
    }

    // Add categoryId to the where clause if provided
    if (categoryId) {
      if (!queryOptions.where) queryOptions.where = {};
      queryOptions.where.categoryId = categoryId;
    }

    // Fetch products based on the query options
    const products = await Product.findAll(queryOptions);

    if (products.length === 0) {
      return res.status(404).send({ message: `No products found with the provided criteria` });
    }

    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.filtermale = async (req, res) => {
  const { sizeId, colorId, brandId, categoryId } = req.query;

  try {
    let queryOptions = {
      include: [],
      where: { gender: 'male' } // กรองเฉพาะเพศชาย
    };

    // Include sizes if sizeId is provided
    if (sizeId) {
      queryOptions.include.push({
        model: Size,
        as: 'sizes',
        where: { id: sizeId },
        through: { attributes: ['quantity'] } // Include quantity from the join table
      });
    }

    // Include colors if colorId is provided
    if (colorId) {
      queryOptions.include.push({
        model: Color,
        as: 'colors',
        where: { id: colorId },
        through: { attributes: [] } // Exclude the join table attributes
      });
    }

    // Add brandId to the where clause if provided
    if (brandId) {
      queryOptions.where.brandId = brandId;
    }

    // Add categoryId to the where clause if provided
    if (categoryId) {
      queryOptions.where.categoryId = categoryId;
    }

    // Fetch products based on the query options
    const products = await Product.findAll(queryOptions);

    if (products.length === 0) {
      return res.status(404).send({ message: `No male products found with the provided criteria` });
    }

    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


exports.filterfemale = async (req, res) => {
  const { sizeId, colorId, brandId, categoryId } = req.query;

  try {
    let queryOptions = {
      include: [],
      where: { gender: 'female' } // กรองเฉพาะเพศหญิง
    };

    // Include sizes if sizeId is provided
    if (sizeId) {
      queryOptions.include.push({
        model: Size,
        as: 'sizes',
        where: { id: sizeId },
        through: { attributes: ['quantity'] } // Include quantity from the join table
      });
    }

    // Include colors if colorId is provided
    if (colorId) {
      queryOptions.include.push({
        model: Color,
        as: 'colors',
        where: { id: colorId },
        through: { attributes: [] } // Exclude the join table attributes
      });
    }

    // Add brandId to the where clause if provided
    if (brandId) {
      queryOptions.where.brandId = brandId;
    }

    // Add categoryId to the where clause if provided
    if (categoryId) {
      queryOptions.where.categoryId = categoryId;
    }

    // Fetch products based on the query options
    const products = await Product.findAll(queryOptions);

    if (products.length === 0) {
      return res.status(404).send({ message: `No female products found with the provided criteria` });
    }

    res.send(products);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

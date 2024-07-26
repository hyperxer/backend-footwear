// routes/product.routes.js
module.exports = app => {
    const products = require('../Controllers/product.controller.js');
    const upload = require('../Middleware/upload.middleware.js');
    var router = require("express").Router();
  
    router.post("/",upload.single('prod_img'), products.create);
    router.get("/", products.findAll);
    router.get("/:id", products.findOne);
    // router.put("/:id", products.update);
    // router.delete("/:id", products.delete);
    router.get('/details', products.getProductDetails);
    router.get('/search', products.search);
    app.use('/api/products', router);
  };
  
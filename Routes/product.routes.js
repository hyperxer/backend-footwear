// routes/product.routes.js
module.exports = app => {
    const products = require('../Controllers/product.controller.js');
    const upload = require('../Middleware/upload.middleware.js');
    var router = require("express").Router();
  
    router.post("/",upload.single('prod_img'), products.create);
    router.get("/", products.findAll);
    router.get('/male', products.findAllMale);
    router.get('/female', products.findAllFemale);
    router.get("/:id", products.findOne);
    // router.put("/:id", products.update);
    // router.delete("/:id", products.delete);
    router.get('/details', products.getProductDetails);
    // router.get("/search", products.search);
    router.get("/size/:sizeId", products.findBySize);
    // router.get("/searchsizecolor", products.findBySizeAndColor);
    app.get("/api/products/searching", products.findBySizeAndColor);
    app.get("/api/products/filters", products.findBySizeColorBrandAndCategory);
    app.get("/api/products/filtermale", products.filtermale);
    app.get("/api/products/filterfemale", products.filterfemale);
    app.use('/api/products', router);
  };

// routes/product.routes.js
module.exports = app => {
    const review = require('../Controllers/review.controller.js');
  
    var router = require("express").Router();
  
    router.post("/", review.create);
    // router.get("/", products.findAll);
    router.get("/:id", review.findOne);
    // router.put("/:id", products.update);
    // router.delete("/:id", products.delete);
  
    app.use('/api/review', router);
  };
  
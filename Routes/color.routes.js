// routes/product.routes.js
module.exports = app => {
    const color = require('../Controllers/color.controller.js');
  
    var router = require("express").Router();
  
    router.post("/", color.create);
    router.get("/", color.findAll);
    router.get("/:id", color.findOne);
    // router.put("/:id", products.update);
    // router.delete("/:id", products.delete);
  
    app.use('/api/color', router);
  };
  
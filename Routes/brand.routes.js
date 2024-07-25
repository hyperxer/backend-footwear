// routes/brand.routes.js
module.exports = app => {
    const brands = require('../Controllers/brand.controller.js');
  
    var router = require("express").Router();
  
    router.post("/", brands.create);
    router.get("/", brands.findAll);
    router.get("/:id", brands.findOne);
  
    app.use('/api/brand', router);
  };
  
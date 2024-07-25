module.exports = app => {
    const category = require('../Controllers/category.controller.js');
  
    var router = require("express").Router();
  
    router.post("/", category.create);
    router.get("/", category.findAll);
    router.get("/:id", category.findOne);
  
    app.use('/api/category', router);
  };
  
// routes/product.routes.js
module.exports = app => {
    const size = require('../Controllers/size.controller.js');
  
    var router = require("express").Router();
  
    router.post("/", size.create);
    router.get("/male", size.findAllMale);
    router.get("/female", size.findAllfemale);
    router.get("/:id", size.findOne);
    // router.put("/:id", products.update);
    // router.delete("/:id", products.delete);
  
    app.use('/api/size', router);
  };
  
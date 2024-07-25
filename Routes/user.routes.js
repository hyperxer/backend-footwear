// routes/user.routes.js

const { verifyToken } = require("../Middleware/auth.middleware.js");

module.exports = app => {
    const users = require('../Controllers/user.controller.js');
  
    var router = require("express").Router();
  
    router.post("/", users.create);
  
    app.use('/api/users', router);
  };

  // module.exports = app => {
  //   const users = require('../Controllers/user.controller.js');
  
  //   var router = require("express").Router();
  
  //   router.post("/", verifyToken, users.create);
  
  //   app.use('/api/users', router);
  // };
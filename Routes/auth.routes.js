// routes/auth.routes.js
module.exports = app => {
    const auth = require('../Controllers/auth.controller.js');
  
    var router = require("express").Router();
  
    router.post("/register", auth.register);
    router.post("/login", auth.login);
  
    app.use('/api/auth', router);
  };
  
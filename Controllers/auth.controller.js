// controllers/auth.controller.js
const db = require("../Models");
const User = db.user;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const { firstname, lastname, email, password, role } = req.body;
  
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).send({
        message: "All fields are required!"
      });
    }
  
    User.findOne({
      where: {
        email: email
      }
    })
      .then(user => {
        if (user) {
          return res.status(400).send({
            message: "Email is already in use!"
          });
        }
  
        const hashedPassword = bcrypt.hashSync(password, 8);
  
        User.create({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          role: role || "user"
        })
          .then(() => {
            res.send({ message: "User registered successfully!" });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Email and password are required!"
    });
  }

  User.findOne({
    where: {
      email: email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!"
        });
      }

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      });

      res.send({
        id: user.id,
        email: user.email,
        role: user.role,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

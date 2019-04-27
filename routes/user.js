const express = require("express");
const router = express.Router();
const User = require("../models").User;
const Sequelize = require("sequelize");
const authenticateUser = require("./auth");
const bcryptjs = require("bcryptjs");

/**
 * @GET Returns the currently authenticated user
 */
router.get("/", authenticateUser, (req, res) => {
  res.status(200);
  res.json({ user: "user1 logged in" });
});

/**
 * @POST Creates a user
 */
router.post("/", (req, res, next) => {
  // verify that the email provided isn't already associated with an existing user record
  User.findOne({ where: { emailAddress: req.body.emailAddress } })
    .then(user => {
      if (user) {
        res.json({ error: "The email address exists already" });
      } else {
        const newUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailAddress: req.body.emailAddress,
          password: req.body.password
        };
        // Hash the password
        newUser.password = bcryptjs.hashSync(newUser.password);
        // Create the user
        User.create(newUser)
          .then(() => {
            res.status(201).end();
          })
          // catch validation errors
          .catch(err => {
            // set err.status to 400 then send err to globla error handler
            err.status = 400;
            next(err);
          });
      }
    })
    .catch(err => {
      err.status = 400;
      next(err);
    });
});

module.exports = router;

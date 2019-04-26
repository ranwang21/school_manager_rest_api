const express = require("express");
const router = express.Router();
const User = require("../models").User;

/**
 * @GET Returns the currently authenticated user
 */
router.get("/", (req, res) => {
  res.status(200);
  res.json({ user: "user1 logged in" });
});

/**
 * @POST Creates a user
 */
router.post("/", (req, res) => {
  User.findOne({ where: { emailAddress: req.body.emailAddress } })
    .then(user => {
      if (user) {
        res.json({ altert: "user exists already" });
      } else {
        const newUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          emailAddress: req.body.emailAddress,
          password: req.body.password
        };
        User.create(newUser).then(() => {
          res.status(201).end();
        });
      }
    })
    .catch(err => console.error(err));
});

module.exports = router;

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
  User.findOne({ where: { emailAddress: req.body.emailAddress } }).then(
    user => {
      if (user) {
        res.json({ altert: "user exists already" });
      } else {
        User.create(req.body).then(() => res.json({ alter: "created" }));
      }
    }
  );
});

module.exports = router;

const bcryptjs = require("bcryptjs");
const auth = require("basic-auth");
const User = require("../models").User;

// const auth middleware
module.exports = (req, res, next) => {
  // const a message variable to store auth errors
  let message = null;

  // retrieve key and secret from auth header
  const credentials = auth(req);
  // if successfully retrieved...
  if (credentials) {
    // findout that user with email address from auth header
    User.findOne({ where: { emailAddress: credentials.name } }).then(user => {
      if (user) {
        // if the user is found, then check if password matches
        const authenticated = bcryptjs.compareSync(
          credentials.pass,
          user.password
        );
        if (authenticated) {
          // if password matches, store user in req and allow user to visit the route
          req.currentUser = user;
          next();
        } else {
          // if password unmatches, send 401 and deny access to the requested route
          res.status(401);
          message = "Wrong password, please try again";
          res.json({ message: message });
        }
      } else {
        // if not matching user found, tell the client
        message = "Email address not found";
        res.status(401);
        res.json({ message: message });
      }
    });
  } else {
    // return 401 and ask for providing credentials
    res.status(401);
    message = "Please provide login credentials";
    res.json({ message: message });
  }
};

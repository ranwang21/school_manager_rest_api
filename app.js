"use strict";

const express = require("express");
const morgan = require("morgan");
const Sequelize = require("sequelize");
const models = require("./models").sequelize;
const bodyParser = require("body-parser");

// construct the database
const db = new Sequelize({
  dialect: "sqlite",
  storage: "./fsjstd-restapi.db"
});

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();

// use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup morgan which gives us http request logging
app.use(morgan("dev"));

//test the database connection
db.authenticate()
  .then(() => {
    console.log("\ndatabase connected\n");
  })
  .catch(err => console.error("connection failed"));

// TODO setup your api routes here

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the REST API project!"
  });
});

// use routes
app.use("/api", require("./routes/index"));
app.use("/api/users", require("./routes/user"));

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});

// set our port
const port = process.env.PORT || 5000;

// syn models with database
models.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Express server is listening on port ${port}`);
  });
});

require("dotenv").config();
require("express-async-errors");
// server
const express = require("express");
const app = express();
const port = process.env.PORT || 5003;
const connectDB = require("./models");
//middleware
const morgan = require("morgan");

app.use(morgan("tiny"));


connectDB.sequelize
  .sync()
  .then(() => {
    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(
      "Error synchronizing Sequelize models with the database:",
      error
    );
  });

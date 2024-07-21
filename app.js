require("dotenv").config();
require("express-async-errors");
// server
const express = require("express");
const app = express();
const port = process.env.PORT || 5003;




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

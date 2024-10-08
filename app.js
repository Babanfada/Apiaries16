require("dotenv").config();
require("express-async-errors");
// server
const express = require("express");
const app = express();
const port = process.env.PORT || 5003;
const connectDB = require("./models");
const path = require("path");
// uplaod files
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

// security
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

//middleware
require("./middlewares/customErrors/passportConfig");
app.use(express.json());
const morgan = require("morgan");
app.use(morgan("dev"));
const passport = require("passport");
// const session = require("express-session");

// Error Handling Middleware
const notFound = require("./middlewares/notFoundError");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

//cookie
const cookieParser = require("cookie-parser");

// Router
const employeesRoutes = require("./routes/employeesRouter");
const authRoutes = require("./routes/authRouter");
const empNokRoutes = require("./routes/employeesNokRouter");
const apStationRoutes = require("./routes/apStationRouter");
const hHroutes = require("./routes/honeyHarvestRouter");
const huntersRoutes = require("./routes/swarmHuntersRouter");
const hivesRoutes = require("./routes/hivesRouter");
const catchReportsRoutes = require("./routes/catchReportsRouter");
const servicesRoutes = require("./routes/servicesRouter");
const setupComponentsRoutes = require("./routes/apiarySetupComponentsRouter");
const consultancyItemsRoutes = require("./routes/consultancyItemsRouter");
const pollinationSevicesRoutes = require("./routes/pollinationServicesRouter");
const supplyprovisionItemsRoutes = require("./routes/supplyProvisionItemsRouter");
const equipmentsRoutes = require("./routes/equipmentsRouter");
const suppliesRoutes = require("./routes/suppliesRouter");
const productRoutes = require("./routes/productsRouter");
// const productColorRoutes = require("./routes/productColorRouter");
// const productImagesRoutes = require("./routes/productImagesRouter");
const reviewRoutes = require("./routes/reviewsRouter");
const reviewImagesRoutes = require("./routes/reviewImagesRouter");
const orderRoutes = require("./routes/ordersRouter");
const ordeerItemsRoutes = require("./routes/orderItemsRouter");
const deliveryAddressRoutes = require("./routes/deliveryAddressRouter");
const usersRoutes = require("./routes/usersRouter");
const userOrdersRoutes = require("./routes/userOrdersRouter");
const authflowRoutes = require("./routes/authFlowRouter");
// use security
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5003",
      "http://localhost:3000",
      // "https://accounts.google.com",
    ], // specify the allowed origin(s)
    credentials: true, // enable sending/receiving cookies
  })
);
// use Cookie
app.use(cookieParser(process.env.JWT_SECRET));
// google auth
// app.get("/", (req, res) => {
//   res.send('<a href="api/v1/authflow/google">login with google</a>');
// });
// use upload
app.use(fileUpload({ useTempFiles: true }));
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Google auth
// app.use(
//   session({ secret: "your_secret_key", resave: false, saveUninitialized: true })
// );
app.use(passport.initialize());
// app.use(passport.session());
// use Routes
app.use("/docs", express.static("./documentation"));
app.use("/api/v1/employees", employeesRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/authentication", authRoutes);
app.use("/api/v1/employeesnok", empNokRoutes);
app.use("/api/v1/apiarystations", apStationRoutes);
app.use("/api/v1/honeyharvest", hHroutes);
app.use("/api/v1/swarmhunters", huntersRoutes);
app.use("/api/v1/hives", hivesRoutes);
app.use("/api/v1/catchreports", catchReportsRoutes);
app.use("/api/v1/services", servicesRoutes);
app.use("/api/v1/apiarysetupcomponents", setupComponentsRoutes);
app.use("/api/v1/consultancyitems", consultancyItemsRoutes);
app.use("/api/v1/pollinationservices", pollinationSevicesRoutes);
app.use("/api/v1/supplyprovisionitems", supplyprovisionItemsRoutes);
app.use("/api/v1/equipments", equipmentsRoutes);
app.use("/api/v1/supplies", suppliesRoutes);
app.use("/api/v1/products", productRoutes);
// app.use("/api/v1/productscolor", productColorRoutes);
// app.use("/api/v1/productsimages", productImagesRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/reviewsimages", reviewImagesRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/orderitems", ordeerItemsRoutes);
app.use("/api/v1/deliveryaddress", deliveryAddressRoutes);
app.use("/api/v1/usersorders", userOrdersRoutes);
app.use("/api/v1/authflow", authflowRoutes);
//Serve static files from the React app
app.use(express.static(path.join(__dirname, "dashboard", "build")));

// Catch-all route to serve React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dashboard", "build", "index.html"));
});
//Error Handling Middleware for routes and interacting with the database
app.use(notFound);
app.use(errorHandlerMiddleware);

// Sequre Connection
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

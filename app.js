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

// use Routes
app.use("/api/v1/employees", employeesRoutes);
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
app.use("/api/v1/consultancyitems", pollinationSevicesRoutes);
app.use("/api/v1/supplyprovisionitems", supplyprovisionItemsRoutes);
app.use("/api/v1/equipments", equipmentsRoutes);
app.use("/api/v1/supplies", suppliesRoutes);

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

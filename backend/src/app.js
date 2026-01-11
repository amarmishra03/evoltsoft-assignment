const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/stations", require("./routes/station.routes"));

module.exports = app;

const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    powerOutput: { type: Number, required: true },
    connectorType: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChargingStation", stationSchema);

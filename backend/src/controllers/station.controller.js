const Station = require("../models/ChargingStation");

exports.createStation = async (req, res) => {
  try {
    const station = await Station.create(req.body);
    res.status(201).json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStations = async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(station);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    await Station.findByIdAndDelete(req.params.id);
    res.json({ message: "Station deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

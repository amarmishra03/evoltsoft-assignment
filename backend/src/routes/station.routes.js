const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const {
  createStation,
  getStations,
  updateStation,
  deleteStation,
} = require("../controllers/station.controller");

router.use(auth);
router.post("/", createStation);
router.get("/", getStations);
router.put("/:id", updateStation);
router.delete("/:id", deleteStation);

module.exports = router;

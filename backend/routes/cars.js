const router = require("express").Router();
const c = require("../controllers/carController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", c.getCars);
router.post("/", auth, admin, c.addCar);
router.delete("/:id", auth, admin, c.deleteCar);

module.exports = router;

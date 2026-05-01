const express = require("express")
const router = express.Router()

const statsController = require("../controllers/statsController")
const { protect, adminOnly } = require("../middleware/authMiddleware")

router.post("/visit", statsController.addVisit)
router.get("/", protect, adminOnly, statsController.getStats)

module.exports = router

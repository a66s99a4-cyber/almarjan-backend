const express = require("express")
const router = express.Router()

const priceController = require("../controllers/priceController")
const { protect, adminOnly } = require("../middleware/authMiddleware")

router.get("/all", priceController.getAllPrices)
router.get("/options", priceController.getOptions)
router.get("/", priceController.getPrice)

router.post("/", protect, adminOnly, priceController.createPrice)
router.put("/:id", protect, adminOnly, priceController.updatePrice)
router.delete("/:id", protect, adminOnly, priceController.deletePrice)

module.exports = router

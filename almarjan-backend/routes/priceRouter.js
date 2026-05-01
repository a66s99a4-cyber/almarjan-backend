const express = require("express")
const router = express.Router()

const priceController = require("../controllers/priceController")

router.get("/all", priceController.getAllPrices)

router.get("/options", priceController.getOptions)

router.get("/", priceController.getPrice)

router.post("/", priceController.createPrice)

router.put("/:id", priceController.updatePrice)

router.delete("/:id", priceController.deletePrice)

module.exports = router

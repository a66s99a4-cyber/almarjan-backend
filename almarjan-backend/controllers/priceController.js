const Price = require("../models/Price")

const getPrice = async (req, res) => {
  try {
    const { area, propertyType, cleaningType } = req.query

    if (!area || !propertyType || !cleaningType) {
      return res.status(400).json({
        message: "area, propertyType, and cleaningType are required"
      })
    }

    const price = await Price.findOne({
      area,
      propertyType,
      cleaningType
    })

    if (!price) {
      return res.status(404).json({ message: "Price not found" })
    }

    res.json(price)
  } catch (error) {
    res.status(500).json({
      message: "Price error",
      error: error.message
    })
  }
}

const getAllPrices = async (req, res) => {
  try {
    const prices = await Price.find().sort({ createdAt: -1 })
    res.json(prices)
  } catch (error) {
    res.status(500).json({
      message: "Error fetching prices",
      error: error.message
    })
  }
}

const getOptions = async (req, res) => {
  try {
    const prices = await Price.find()

    const areas = [...new Set(prices.map((item) => item.area))]
    const propertyTypes = [...new Set(prices.map((item) => item.propertyType))]

    res.json({
      areas,
      propertyTypes
    })
  } catch (error) {
    res.status(500).json({
      message: "Error fetching options",
      error: error.message
    })
  }
}

const createPrice = async (req, res) => {
  try {
    const { area, propertyType, cleaningType, price } = req.body

    if (!area || !propertyType || !cleaningType || !price) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    const newPrice = await Price.create({
      area,
      propertyType,
      cleaningType,
      price: Number(price)
    })

    res.status(201).json(newPrice)
  } catch (error) {
    res.status(500).json({
      message: "Error creating price",
      error: error.message
    })
  }
}

const updatePrice = async (req, res) => {
  try {
    const { id } = req.params
    const { area, propertyType, cleaningType, price } = req.body

    const updatedPrice = await Price.findByIdAndUpdate(
      id,
      {
        area,
        propertyType,
        cleaningType,
        price: Number(price)
      },
      { new: true }
    )

    if (!updatedPrice) {
      return res.status(404).json({ message: "Price not found" })
    }

    res.json(updatedPrice)
  } catch (error) {
    res.status(500).json({
      message: "Error updating price",
      error: error.message
    })
  }
}

const deletePrice = async (req, res) => {
  try {
    const { id } = req.params

    const deletedPrice = await Price.findByIdAndDelete(id)

    if (!deletedPrice) {
      return res.status(404).json({ message: "Price not found" })
    }

    res.json({ message: "Price deleted successfully" })
  } catch (error) {
    res.status(500).json({
      message: "Error deleting price",
      error: error.message
    })
  }
}

module.exports = {
  getPrice,
  getAllPrices,
  getOptions,
  createPrice,
  updatePrice,
  deletePrice
}

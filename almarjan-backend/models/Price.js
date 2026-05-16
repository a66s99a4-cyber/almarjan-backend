const mongoose = require("mongoose")

const priceSchema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: true,
      trim: true
    },

    propertyType: {
      type: String,
      required: true,
      trim: true
    },

    cleaningType: {
      type: String,
      required: true,
      default: "Basic"
    },

    price: {
      type: Number,
      required: true
    },

    cost: {
      type: Number,
      default: 0
    },

    smallTankCleaningPrice: {
      type: Number,
      default: 0
    },

    largeTankCleaningPrice: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

priceSchema.index(
  { area: 1, propertyType: 1, cleaningType: 1 },
  { unique: true }
)

module.exports = mongoose.model("Price", priceSchema)

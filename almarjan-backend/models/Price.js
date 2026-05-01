const mongoose = require("mongoose")

const priceSchema = new mongoose.Schema(
  {
    area: {
      type: String,
      required: true
    },
    propertyType: {
      type: String,
      required: true
    },
    cleaningType: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Price", priceSchema)

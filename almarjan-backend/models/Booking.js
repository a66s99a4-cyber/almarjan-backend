const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    customerName: String,
    phone: String,

    area: String,
    propertyType: String,
    cleaningType: String,

    locationLink: String,
    areaName: String,
    houseNumber: String,

    date: String,
    time: String,

    price: Number,
    notes: String,

    paymentMethod: {
      type: String,
      default: "whatsapp"
    },

    paymentStatus: {
      type: String,
      default: "pending"
    },

    status: {
      type: String,
      default: "pending"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Booking", bookingSchema)

const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    customerName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    area: String,
    propertyType: String,

    cleaningType: {
      type: String,
      default: "Basic"
    },

    tankCleaning: {
      type: Boolean,
      default: false
    },

    tankCleaningSize: {
      type: String,
      enum: ["none", "small", "large"],
      default: "none"
    },

    locationLink: String,
    areaName: String,
    houseNumber: String,

    date: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      default: 0
    },

    cost: {
      type: Number,
      default: 0
    },

    profit: {
      type: Number,
      default: 0
    },

    source: {
      type: String,
      enum: ["website", "external"],
      default: "website"
    },

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

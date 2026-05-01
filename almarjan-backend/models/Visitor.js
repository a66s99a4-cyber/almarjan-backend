const mongoose = require("mongoose")

const visitorSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      default: "website"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Visitor", visitorSchema)

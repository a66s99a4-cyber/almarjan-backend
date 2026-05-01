const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB")
})

mongoose.connection.on("error", (error) => {
  console.log("MongoDB error:", error.message)
})

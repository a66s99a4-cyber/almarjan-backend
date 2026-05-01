const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()
require("./db")

const authRouter = require("./routes/authRouter")
const bookingRouter = require("./routes/bookingRouter")
const priceRouter = require("./routes/priceRouter")
const statsRouter = require("./routes/statsRouter")

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.send("Al Marjan Cleaning API is running")
})

app.use("/auth", authRouter)
app.use("/bookings", bookingRouter)
app.use("/prices", priceRouter)
app.use("/stats", statsRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

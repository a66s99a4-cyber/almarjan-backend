const Visitor = require("../models/Visitor")
const User = require("../models/User")
const Booking = require("../models/Booking")

const addVisit = async (req, res) => {
  try {
    const { page } = req.body

    const visit = await Visitor.create({
      page: page || "website"
    })

    res.status(201).json(visit)
  } catch (error) {
    res.status(500).json({ message: "Visit error", error: error.message })
  }
}

const getStats = async (req, res) => {
  try {
    const visitorsCount = await Visitor.countDocuments()
    const usersCount = await User.countDocuments()
    const bookingsCount = await Booking.countDocuments()
    const completedBookings = await Booking.countDocuments({ status: "completed" })
    const paidBookings = await Booking.find({ paymentStatus: "paid" })

    const income = paidBookings.reduce((total, booking) => {
      return total + Number(booking.price || 0)
    }, 0)

    res.json({
      visitorsCount,
      usersCount,
      bookingsCount,
      completedBookings,
      paidBookingsCount: paidBookings.length,
      income
    })
  } catch (error) {
    res.status(500).json({ message: "Stats error", error: error.message })
  }
}

module.exports = {
  addVisit,
  getStats
}

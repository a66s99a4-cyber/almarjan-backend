const Booking = require("../models/Booking")
const Price = require("../models/Price")

const createBooking = async (req, res) => {
  try {
    let finalPrice = null

    if (req.body.cleaningType === "Basic") {
      const priceDoc = await Price.findOne({
        area: req.body.area,
        propertyType: req.body.propertyType,
        cleaningType: "Basic"
      })

      if (priceDoc) {
        finalPrice = priceDoc.price
      }
    }

    const booking = await Booking.create({
      user: req.user.id,
      customerName: req.user.name,
      phone: req.user.phone,

      area: req.body.area,
      propertyType: req.body.propertyType,
      cleaningType: req.body.cleaningType,

      locationLink: req.body.locationLink,
      areaName: req.body.areaName,
      houseNumber: req.body.houseNumber,

      date: req.body.date,
      time: req.body.time,
      price: finalPrice,
      notes: req.body.notes,

      paymentMethod: req.body.paymentMethod || "whatsapp",
      paymentStatus: "pending",
      status: "pending"
    })

    res.status(201).json(booking)
  } catch (error) {
    res.status(500).json({ message: "Booking error", error: error.message })
  }
}

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" })
  }
}

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 })
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ message: "Admin fetch error", error: error.message })
  }
}

const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )

    res.json(booking)
  } catch (error) {
    res.status(500).json({ message: "Update status error" })
  }
}

const updatePaymentStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: req.body.paymentStatus },
      { new: true }
    )

    res.json(booking)
  } catch (error) {
    res.status(500).json({ message: "Update payment error" })
  }
}

const resetIncome = async (req, res) => {
  try {
    await Booking.updateMany(
      { paymentStatus: "paid" },
      { paymentStatus: "pending" }
    )

    res.json({ message: "Income reset successfully" })
  } catch (error) {
    res.status(500).json({ message: "Reset income error" })
  }
}

const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    res.json({ message: "Booking deleted" })
  } catch (error) {
    res.status(500).json({ message: "Delete booking error" })
  }
}

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  updatePaymentStatus,
  resetIncome,
  deleteBooking
}

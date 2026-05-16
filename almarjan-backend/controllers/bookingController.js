const Booking = require("../models/Booking")
const Price = require("../models/Price")

const createBooking = async (req, res) => {
  try {
    const {
      customerName,
      phone,
      area,
      propertyType,
      cleaningType,
      rooms,
      tankCleaning,
      locationLink,
      areaName,
      houseNumber,
      date,
      notes,
      paymentMethod
    } = req.body

    if (!customerName || !phone || !date) {
      return res.status(400).json({
        message: "Customer name, phone, and date are required"
      })
    }

    let finalPrice = 0
    let finalCost = 0

    if (cleaningType === "Basic") {
      const priceDoc = await Price.findOne({
        area,
        propertyType,
        cleaningType: "Basic"
      })

      if (!priceDoc) {
        return res.status(404).json({
          message: "Price not found for selected area and property type"
        })
      }

      const roomsNumber = Number(rooms || 0)
      const tankSelected = tankCleaning === true || tankCleaning === "true"

      finalPrice =
        Number(priceDoc.price || 0) +
        roomsNumber * Number(priceDoc.roomPrice || 0) +
        (tankSelected ? Number(priceDoc.tankCleaningPrice || 0) : 0)

      finalCost = Number(priceDoc.cost || 0)
    }

    const profit = finalPrice - finalCost

    const booking = await Booking.create({
      user: req.user?.id || null,

      customerName,
      phone,

      area,
      propertyType,
      cleaningType,

      rooms: Number(rooms || 0),
      tankCleaning: tankCleaning === true || tankCleaning === "true",

      locationLink,
      areaName,
      houseNumber,

      date,

      price: finalPrice,
      cost: finalCost,
      profit,

      notes,

      paymentMethod: paymentMethod || "whatsapp",
      paymentStatus: "pending",
      status: "pending"
    })

    res.status(201).json(booking)
  } catch (error) {
    res.status(500).json({
      message: "Booking error",
      error: error.message
    })
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

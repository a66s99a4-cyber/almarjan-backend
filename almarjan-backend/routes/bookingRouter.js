const express = require("express")
const router = express.Router()

const bookingController = require("../controllers/bookingController")
const { protect, adminOnly } = require("../middleware/authMiddleware")

router.post("/", protect, bookingController.createBooking)
router.get("/my-bookings", protect, bookingController.getMyBookings)

router.get("/admin", protect, adminOnly, bookingController.getAllBookings)
router.put("/:id/status", protect, adminOnly, bookingController.updateBookingStatus)
router.put("/:id/payment", protect, adminOnly, bookingController.updatePaymentStatus)
router.put("/reset-income/all", protect, adminOnly, bookingController.resetIncome)
router.delete("/:id", protect, adminOnly, bookingController.deleteBooking)

module.exports = router

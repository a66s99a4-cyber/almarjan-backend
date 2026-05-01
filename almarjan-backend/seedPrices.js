require("dotenv").config()
require("./db")

const Price = require("./models/Price")

const prices = [
  { area: "Manama", propertyType: "Apartment", cleaningType: "Basic", price: 15 },
  { area: "Manama", propertyType: "House", cleaningType: "Basic", price: 30 },
  { area: "Manama", propertyType: "Kitchen", cleaningType: "Basic", price: 10 },

  { area: "Riffa", propertyType: "Apartment", cleaningType: "Basic", price: 18 },
  { area: "Riffa", propertyType: "House", cleaningType: "Basic", price: 35 },
  { area: "Riffa", propertyType: "Kitchen", cleaningType: "Basic", price: 12 },

  { area: "Muharraq", propertyType: "Apartment", cleaningType: "Basic", price: 17 },
  { area: "Muharraq", propertyType: "House", cleaningType: "Basic", price: 32 },
  { area: "Muharraq", propertyType: "Kitchen", cleaningType: "Basic", price: 11 }
]

const seed = async () => {
  await Price.deleteMany()
  await Price.insertMany(prices)
  console.log("Prices seeded")
  process.exit()
}

seed()

const mongoose = require("mongoose");
const buynowschema = new mongoose.Schema({
  targetId: {
    type: String,
    required: true,
  },
  vin: {
    type: String,
    required: true,
  },
  vehicle: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  postal: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default:Date.now,
  }
});

const buynowschemas = mongoose.model("buynow", buynowschema);

module.exports = buynowschemas;

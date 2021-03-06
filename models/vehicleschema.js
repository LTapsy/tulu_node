const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const vehicleschema = new mongoose.Schema({
  targetId: {
    type: String,
    required: false,
  },vin: {
    type: String,
    required: false,
  },
  year: {
    type: Number,
    required: false,
  },
  make: {
    type: String,
    required: false,
  },
  model: {
    type: String,
    required: false,
  },
  vehicleType: {
    type: String,
    required: false,
  },
  trim: {
    type: String,
    required: false,
  },
  dealerId: {
    type: String,
    required: false,
  },
  isSold: {
    type: String,
    required: false,
  },
  doors: {
    type: String,
    required: false,
  },
  mileage: {
    type: Number,
    required: false,
  },
  modelNumber: {
    type: String,
    required: false,
  },
  driveType: {
    type: String,
    required: false,
  },
  msrp: {
    type: String,
    required: false,
  },
  minPrice: {
    type: Number,
    required: false,
  },
  maxPrice: {
    type: Number,
    required: false,
  },
  refFee: {
    type: String,
    required: false,
  },
  engineName: {
    type: String,
    required: false,
  },
  engineBrand: {
    type: String,
    required: false,
  },
  engineID: {
    type: String,
    required: false,
  },
  fuelType: {
    type: String,
    required: false,
  },
  iceMaxHp: {
    type: String,
    required: false,
  },
  iceMaxTorque: {
    type: String,
    required: false,
  },
  maxPayload: {
    type: String,
    required: false,
  },
  transmissionName: {
    type: String,
    required: false,
  },
  colorName: {
    type: String,
    required: false,
  },
  colorHex: {
    type: String,
    required: false,
  },
  baseTowingCapacity: {
    type: String,
    required: false,
  },
  grossWeight: {
    type: String,
    required: false,
  },
  fuelTankCapacity: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  views: {
    type: Number,
    default: 0
  },
});

vehicleschema.plugin(mongoose_fuzzy_searching, { fields: ['make', 'year', 'model'] });

const vehicleschemas = mongoose.model("vehicles", vehicleschema);

module.exports = vehicleschemas;

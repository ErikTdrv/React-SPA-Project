const mongoose = require("mongoose");
const monitorSchema = new mongoose.Schema({
  manufacturer: {
    type: String,
    required: true,
    minlength: [4, "Manufacturer should have at least 2 characters!"],
    maxlength: [10, "Manufacturer cannot have more than 10 characters!"],
  },
  screenresolution: {
    required: [true, 'Screen Resolution is required'],
    type: String,
  },
  resolution: {
    required: [true, 'Resolution is required'],
    type: String,
  },
  refreshrate: {
    required: [true, 'Refresh Rate is required'],
    type: String,
  },
  paneltype: {
    required: [true, 'Panel Type is required'],
    type: String,
  },
  price: {
    required: [true, 'Price is required'],
    type: String,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  images: {
    required: [true, 'Images are required'],
    type: Array,
  },
});

const Monitor = new mongoose.model("Monitor", monitorSchema);
module.exports = Monitor;

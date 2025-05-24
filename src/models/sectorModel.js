const mongoose = require('mongoose');

const subitemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    }
  },
  {
    _id: false
  }
);

const sectorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    battalion: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: false,
    },
    commander: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    ais: {
      type: String,
      required: false,
    },
    subitems: [subitemSchema]
  },
  {
    timestamps: true,
  }
);

const Sector = mongoose.model('Sector', sectorSchema);

module.exports = Sector;
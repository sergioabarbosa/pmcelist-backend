const mongoose = require('mongoose');

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
      required: true,
    },
    commander: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    ais: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sector = mongoose.model('Sector', sectorSchema);

module.exports = Sector;
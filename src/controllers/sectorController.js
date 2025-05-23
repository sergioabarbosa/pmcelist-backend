const Sector = require('../models/sectorModel');

// @desc    Fetch all sectors
// @route   GET /api/sectors
// @access  Public
const getSectors = async (req, res) => {
  const sectors = await Sector.find({});
  res.json(sectors);
};

// @desc    Fetch single sector
// @route   GET /api/sectors/:id
// @access  Public
const getSectorById = async (req, res) => {
  const sector = await Sector.findById(req.params.id);

  if (sector) {
    res.json(sector);
  } else {
    res.status(404);
    throw new Error('Sector not found');
  }
};

// @desc    Create a sector
// @route   POST /api/sectors
// @access  Private/Admin
const createSector = async (req, res) => {
  const { name, battalion, company, commander, phone, ais } = req.body;

  const sector = new Sector({
    name,
    battalion,
    company,
    commander,
    phone,
    ais,
  });

  const createdSector = await sector.save();
  res.status(201).json(createdSector);
};

// @desc    Update a sector
// @route   PUT /api/sectors/:id
// @access  Private/Admin
const updateSector = async (req, res) => {
  const { name, battalion, company, commander, phone, ais } = req.body;

  const sector = await Sector.findById(req.params.id);

  if (sector) {
    sector.name = name || sector.name;
    sector.battalion = battalion || sector.battalion;
    sector.company = company || sector.company;
    sector.commander = commander || sector.commander;
    sector.phone = phone || sector.phone;
    sector.ais = ais || sector.ais;

    const updatedSector = await sector.save();
    res.json(updatedSector);
  } else {
    res.status(404);
    throw new Error('Sector not found');
  }
};

// @desc    Delete a sector
// @route   DELETE /api/sectors/:id
// @access  Private/Admin
const deleteSector = async (req, res) => {
  const sector = await Sector.findById(req.params.id);

  if (sector) {
    await sector.remove();
    res.json({ message: 'Sector removed' });
  } else {
    res.status(404);
    throw new Error('Sector not found');
  }
};

module.exports = {
  getSectors,
  getSectorById,
  createSector,
  updateSector,
  deleteSector,
};
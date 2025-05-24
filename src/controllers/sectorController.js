const Sector = require('../models/sectorModel');

// @desc    Get all sectors
// @route   GET /api/sectors
// @access  Private
const getSectors = async (req, res) => {
  try {
    const sectors = await Sector.find({});
    res.json(sectors);
  } catch (error) {
    console.error(`Error fetching sectors: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get sector by ID
// @route   GET /api/sectors/:id
// @access  Private
const getSectorById = async (req, res) => {
  try {
    const sector = await Sector.findById(req.params.id);
    
    if (sector) {
      res.json(sector);
    } else {
      res.status(404).json({ message: 'Sector not found' });
    }
  } catch (error) {
    console.error(`Error fetching sector: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update sector
// @route   PUT /api/sectors/:id
// @access  Private/Admin
const updateSector = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized, admin access required' });
    }

    const sector = await Sector.findById(req.params.id);
    
    if (sector) {
      sector.name = req.body.name || sector.name;
      sector.battalion = req.body.battalion || sector.battalion;
      sector.company = req.body.company || sector.company;
      sector.commander = req.body.commander || sector.commander;
      sector.phone = req.body.phone || sector.phone;
      sector.ais = req.body.ais || sector.ais;
      
      // Update subitems if provided
      if (req.body.subitems) {
        sector.subitems = req.body.subitems;
      }
      
      const updatedSector = await sector.save();
      res.json(updatedSector);
    } else {
      res.status(404).json({ message: 'Sector not found' });
    }
  } catch (error) {
    console.error(`Error updating sector: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new sector
// @route   POST /api/sectors
// @access  Private/Admin
const createSector = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized, admin access required' });
    }

    const { name, battalion, company, commander, phone, ais, subitems } = req.body;
    
    const sector = await Sector.create({
      name,
      battalion,
      company,
      commander,
      phone,
      ais,
      subitems: subitems || []
    });
    
    res.status(201).json(sector);
  } catch (error) {
    console.error(`Error creating sector: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a sector
// @route   DELETE /api/sectors/:id
// @access  Private/Admin
const deleteSector = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      return res.status(401).json({ message: 'Not authorized, admin access required' });
    }

    const sector = await Sector.findById(req.params.id);
    
    if (sector) {
      await sector.remove();
      res.json({ message: 'Sector removed' });
    } else {
      res.status(404).json({ message: 'Sector not found' });
    }
  } catch (error) {
    console.error(`Error deleting sector: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getSectors, getSectorById, updateSector, createSector, deleteSector };
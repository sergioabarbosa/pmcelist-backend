const Sector = require('../models/sectorModel');
const Logger = require('js-logger');

// Configure logger
Logger.useDefaults({
  defaultLevel: Logger.DEBUG,
  formatter: function (messages, context) {
    messages.unshift(new Date().toISOString(), context.name + ':');
  }
});

// Create a named logger for this controller
const logger = Logger.get('SectorController');

// @desc    Get all sectors
// @route   GET /api/sectors
// @access  Private
const getSectors = async (req, res) => {
  logger.info('getSectors called');
  try {
    const sectors = await Sector.find({});
    logger.debug(`Found ${sectors.length} sectors`);
    res.json(sectors);
  } catch (error) {
    logger.error(`Error fetching sectors: ${error.message}`);
    console.error(`Error fetching sectors: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get sector by ID
// @route   GET /api/sectors/:id
// @access  Private
const getSectorById = async (req, res) => {
  logger.info(`getSectorById called with id: ${req.params.id}`);
  try {
    const sector = await Sector.findById(req.params.id);
    
    if (sector) {
      logger.debug(`Found sector: ${sector.name}`);
      res.json(sector);
    } else {
      logger.warn(`Sector not found with id: ${req.params.id}`);
      res.status(404).json({ message: 'Sector not found' });
    }
  } catch (error) {
    logger.error(`Error fetching sector: ${error.message}`);
    console.error(`Error fetching sector: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update sector
// @route   PUT /api/sectors/:id
// @access  Private/Admin
const updateSector = async (req, res) => {
  logger.info(`updateSector called with id: ${req.params.id}`);
  logger.debug(`Request method: ${req.method}`);
  logger.debug(`Request path: ${req.originalUrl}`);
  logger.debug(`Request headers: ${JSON.stringify(req.headers)}`);
  logger.debug(`Request body: ${JSON.stringify(req.body)}`);
  logger.debug(`User: ${req.user ? JSON.stringify({id: req.user._id, isAdmin: req.user.isAdmin}) : 'No user'}`);
  
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      logger.warn(`Unauthorized update attempt by user: ${req.user ? req.user._id : 'unknown'}`);
      return res.status(401).json({ message: 'Not authorized, admin access required' });
    }

    const sector = await Sector.findById(req.params.id);
    
    if (sector) {
      logger.debug(`Found sector to update: ${sector.name}`);
      sector.name = req.body.name || sector.name;
      sector.battalion = req.body.battalion || sector.battalion;
      sector.company = req.body.company || sector.company;
      sector.commander = req.body.commander || sector.commander;
      sector.phone = req.body.phone || sector.phone;
      sector.ais = req.body.ais || sector.ais;
      
      // Update subitems if provided
      if (req.body.subitems) {
        logger.debug(`Updating subitems, count: ${req.body.subitems.length}`);
        sector.subitems = req.body.subitems;
      }
      
      const updatedSector = await sector.save();
      logger.info(`Sector updated successfully: ${updatedSector._id}`);
      res.json(updatedSector);
    } else {
      logger.warn(`Sector not found for update with id: ${req.params.id}`);
      res.status(404).json({ message: 'Sector not found' });
    }
  } catch (error) {
    logger.error(`Error updating sector: ${error.message}`);
    console.error(`Error updating sector: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new sector
// @route   POST /api/sectors
// @access  Private/Admin
const createSector = async (req, res) => {
  logger.info('createSector called');
  logger.debug(`Request body: ${JSON.stringify(req.body)}`);
  logger.debug(`User: ${req.user ? JSON.stringify({id: req.user._id, isAdmin: req.user.isAdmin}) : 'No user'}`);
  
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      logger.warn(`Unauthorized create attempt by user: ${req.user ? req.user._id : 'unknown'}`);
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
    
    logger.info(`New sector created: ${sector._id}`);
    res.status(201).json(sector);
  } catch (error) {
    logger.error(`Error creating sector: ${error.message}`);
    console.error(`Error creating sector: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a sector
// @route   DELETE /api/sectors/:id
// @access  Private/Admin
const deleteSector = async (req, res) => {
  logger.info(`deleteSector called with id: ${req.params.id}`);
  logger.debug(`Request method: ${req.method}`);
  logger.debug(`Request path: ${req.originalUrl}`);
  logger.debug(`Request headers: ${JSON.stringify(req.headers)}`);
  logger.debug(`User: ${req.user ? JSON.stringify({id: req.user._id, isAdmin: req.user.isAdmin}) : 'No user'}`);
  
  try {
    // Check if user is admin
    if (!req.user || !req.user.isAdmin) {
      logger.warn(`Unauthorized delete attempt by user: ${req.user ? req.user._id : 'unknown'}`);
      return res.status(401).json({ message: 'Not authorized, admin access required' });
    }

    const sector = await Sector.findById(req.params.id);
    
    if (sector) {
      logger.debug(`Found sector to delete: ${sector.name}`);
      await Sector.deleteOne({ _id: sector._id });
      logger.info(`Sector deleted: ${sector._id}`);
      res.json({ message: 'Sector removed' });
    } else {
      logger.warn(`Sector not found for deletion with id: ${req.params.id}`);
      res.status(404).json({ message: 'Sector not found' });
    }
  } catch (error) {
    logger.error(`Error deleting sector: ${error.message}`);
    console.error(`Error deleting sector: ${error.message}`);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getSectors, getSectorById, updateSector, createSector, deleteSector };
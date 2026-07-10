const Plant = require('../models/Plant');

// @desc    Get all plants
// @route   GET /api/plants
// @access  Public
const getPlants = async (req, res) => {
  try {
    const { difficulty, light, watering, search } = req.query;
    
    let query = {};
    
    if (difficulty) query.difficulty = difficulty;
    if (light) query.light = light;
    if (watering) query.watering = watering;
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const plants = await Plant.find(query);
    res.status(200).json({
      success: true,
      count: plants.length,
      data: plants
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single plant
// @route   GET /api/plants/:id
// @access  Public
const getPlant = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    
    if (!plant) {
      return res.status(404).json({
        success: false,
        message: 'Plant not found'
      });
    }

    res.status(200).json({
      success: true,
      data: plant
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create plant
// @route   POST /api/plants
// @access  Public (for testing)
const createPlant = async (req, res) => {
  try {
    const plant = await Plant.create(req.body);
    res.status(201).json({
      success: true,
      data: plant
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getPlants,
  getPlant,
  createPlant
};
const User = require('../models/User');

// @desc    Add plant to favorites
// @route   POST /api/users/favorites/:plantId
// @access  Private
const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.favorites.includes(req.params.plantId)) {
      user.favorites.push(req.params.plantId);
      await user.save();
    }

    await user.populate('favorites');
    res.status(200).json({
      success: true,
      favorites: user.favorites
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove plant from favorites
// @route   DELETE /api/users/favorites/:plantId
// @access  Private
const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    user.favorites = user.favorites.filter(
      fav => fav.toString() !== req.params.plantId
    );
    await user.save();

    await user.populate('favorites');
    res.status(200).json({
      success: true,
      favorites: user.favorites
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user favorites
// @route   GET /api/users/favorites
// @access  Private
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    res.status(200).json({
      success: true,
      favorites: user.favorites
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  addFavorite,
  removeFavorite,
  getFavorites
};
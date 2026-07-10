const express = require('express');
const router = express.Router();
const {
  addFavorite,
  removeFavorite,
  getFavorites
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/favorites', protect, getFavorites);
router.post('/favorites/:plantId', protect, addFavorite);
router.delete('/favorites/:plantId', protect, removeFavorite);

module.exports = router;
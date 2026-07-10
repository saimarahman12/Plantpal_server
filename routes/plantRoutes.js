const express = require('express');
const router = express.Router();
const {
  getPlants,
  getPlant,
  createPlant
} = require('../controllers/plantController');

router.get('/', getPlants);
router.get('/:id', getPlant);
router.post('/', createPlant);

module.exports = router;
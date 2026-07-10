const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide plant name'],
    trim: true
  },
  scientificName: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide description']
  },
  care: {
    type: String,
    required: [true, 'Please provide care instructions']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'hard'],
    required: true
  },
  light: {
    type: String,
    enum: ['low', 'indirect', 'bright'],
    required: true
  },
  watering: {
    type: String,
    enum: ['low', 'moderate', 'high'],
    required: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x300/4B7A57/FFFFFF?text=Plant'
  },
  tags: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Plant', plantSchema);
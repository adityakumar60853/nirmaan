const mongoose = require('mongoose');

const cscSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a CSC name']
  },
  location: {
    type: String,
    required: true
  },
  demographics: {
    culture: String,
    primaryLanguage: String,
    population: Number,
    ageGroups: [{
      range: String,
      percentage: Number
    }]
  },
  targetAudience: [{
    group: String,
    description: String,
    priority: {
      type: String,
      enum: ['high', 'medium', 'low']
    }
  }],
  volunteers: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    role: String,
    hours: Number,
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  }],
  programs: [{
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['planned', 'ongoing', 'completed'],
      default: 'planned'
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('CSC', cscSchema); 
const mongoose = require('mongoose');

const vacancySchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  requiredSkills: [String],
  requiredMaps: [String],
  requiredExperience: {
    type: String,
    enum: ['entry', 'intermediate', 'senior'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applicants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'shortlisted', 'rejected', 'accepted'],
      default: 'pending'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }],
  status: {
    type: String,
    enum: ['open', 'closed', 'on-hold'],
    default: 'open'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vacancy', vacancySchema); 
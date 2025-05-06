const mongoose = require('mongoose');

const schemeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  benefits: {
    type: [String],
    required: true
  },
  eligibility: {
    type: [String],
    required: true
  },
  documentsRequired: {
    type: [String],
    required: true
  },
  applicationProcess: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Employment', 'Housing', 'Education', 'Healthcare', 'Agriculture', 'Social Welfare']
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Scheme', schemeSchema); 
const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  requiredSkills: [String],
  requiredMaps: [String],
  type: {
    type: String,
    enum: ['training', 'workshop', 'seminar'],
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema); 
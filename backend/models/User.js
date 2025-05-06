const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'jobProvider', 'csc'],
    default: 'user'
  },
  contactNo: {
    type: String,
    required: [true, 'Please add a contact number'],
    unique: true
  },
  aadhaarNo: {
    type: String,
    required: function() {
      return this.role === 'user'; // Only required for regular users
    },
    sparse: true, // This ensures uniqueness is only enforced on non-null values
    unique: true
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  annualIncome: {
    type: Number,
    required: function() {
      return this.role === 'user'; // Only required for regular users
    }
  },
  workType: {
    type: String,
    required: function() {
      return this.role === 'user'; // Only required for regular users
    }
  },
  state: {
    type: String,
    required: function() {
      return this.role === 'user'; // Only required for regular users
    }
  },
  district: {
    type: String,
    required: function() {
      return this.role === 'user'; // Only required for regular users
    }
  },
  dob: {
    type: Date,
    required: function() {
      return this.role === 'user'; // Only required for regular users
    }
  },
  // Job Provider specific fields
  companySector: {
    type: String,
    required: function() {
      return this.role === 'jobProvider';
    }
  },
  companyAddress: {
    type: String,
    required: function() {
      return this.role === 'jobProvider';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema); 
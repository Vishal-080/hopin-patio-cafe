const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  partySize: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },
  tableNumber: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'seated', 'completed', 'cancelled'],
    default: 'pending'
  },
  specialRequests: String,
  contactPhone: String,
  contactEmail: String,
  assignedStaff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
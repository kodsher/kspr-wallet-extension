const mongoose = require('mongoose');

// Define a schema for Contact
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Export the Mongoose model for Contact
module.exports = mongoose.model('Contact', contactSchema);

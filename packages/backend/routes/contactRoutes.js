const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); // Import the Contact model

// POST route to add a new contact
router.post('/add-contact', async (req, res) => {
  const { name, address } = req.body;

  // Create a new contact document
  const newContact = new Contact({ name, address });

  try {
    // Save the contact to MongoDB
    await newContact.save();
    res.status(201).json({ message: 'Contact added successfully', newContact });
  } catch (error) {
    res.status(400).json({ message: 'Error adding contact', error });
  }
});

// GET route to retrieve all contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find(); // Retrieve all contacts from MongoDB
    res.json(contacts); // Send the contacts as JSON
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving contacts', error });
  }
});

// DELETE route to delete a contact by name (username)
router.delete('/delete-contact-by-name/:name', async (req, res) => {
  try {
    const contactName = req.params.name;
    const deletedContact = await Contact.findOneAndDelete({ name: contactName }); // Delete the contact by name
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: `Contact ${contactName} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
});

module.exports = router; // Export the router

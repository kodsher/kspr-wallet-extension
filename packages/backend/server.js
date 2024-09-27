const express = require('express');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes'); // Import the contact routes
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json()); // Middleware to parse JSON bodies

// Use the provided MongoDB Atlas connection string
const mongoURI =
  'mongodb+srv://ksprbot:a8F9ANwcQV3Qy6q9@kspr.to3wr.mongodb.net/?retryWrites=true&w=majority&appName=kspr';

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Use the contact routes
app.use(contactRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

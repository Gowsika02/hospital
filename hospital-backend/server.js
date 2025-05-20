const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospitalDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});
const appointmentSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  date: String,
  department: String,
  doctor: String
});

const Appointment = mongoose.model('Appointment', appointmentSchema);



const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/hospital.html'));
});

app.post('/submit_appointment.php', async (req, res) => {
  const formData = req.body;
  console.log('Appointment Form Submitted:', formData);

  try {
    const newAppointment = new Appointment(formData);
    await newAppointment.save();

    res.send('<h2>Thank you! Your appointment has been booked and saved.</h2><a href="/">Go Back</a>');
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).send('Error saving appointment data.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

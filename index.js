const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://shuvam:shuvam@cluster0.jy65cha.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const doctorSchema = new mongoose.Schema({
    name: String,
    availableDays: [String],
    maxPatients: Number
});

const Doctor = mongoose.model('Doctor', doctorSchema);





// Endpoint for creating a new doctor
app.post('/doctors', async (req, res) => {
    try {
        const { name, availableDays, maxPatients } = req.body;
        const doctor = new Doctor({ name, availableDays, maxPatients });
        await doctor.save();
        res.status(201).json(doctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Endpoint for getting the list of doctors
app.get('/doctors', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint for getting details of a specific doctor
app.get('/doctors/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Endpoint for booking an appointment with a specific doctor
app.post('/appointments/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            // Implement appointment booking logic here
            res.json({ message: 'Appointment booked successfully' });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

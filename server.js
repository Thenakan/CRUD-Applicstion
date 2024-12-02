const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://thenakan12:yzarlHyGhgtYIjrs@crud.39efg.mongodb.net/?retryWrites=true&w=majority&appName=CRUD', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Schema and Model
const labelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

const Label = mongoose.model('Label', labelSchema);

// Routes
// Get all labels
app.get('/labels', async (req, res) => {
  try {
    const labels = await Label.find();
    res.json(labels);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create a new label
app.post('/labels', async (req, res) => {
  try {
    const label = new Label(req.body);
    const savedLabel = await label.save();
    res.status(201).json(savedLabel);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a label
app.put('/labels/:id', async (req, res) => {
  try {
    const updatedLabel = await Label.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedLabel);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete a label
app.delete('/labels/:id', async (req, res) => {
  try {
    await Label.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Start server
const PORT = 5001;  
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

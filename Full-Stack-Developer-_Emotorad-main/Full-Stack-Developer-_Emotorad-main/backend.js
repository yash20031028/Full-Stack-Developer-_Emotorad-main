const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');
const Data = require('./models/Data'); // Assume Data model for CRUD

const app = express();
app.use(cors());
app.use(express.json());

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

mongoose.connect('mongodb://localhost:27017/dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"));

app.post('/auth/google', async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
        user = new User({ name, email });
        await user.save();
    }
    res.status(201).json(user);
});

app.get('/data', async (req, res) => {
    const data = await Data.find();
    res.json(data);
});

app.post('/data', async (req, res) => {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json(newData);
});

app.put('/data/:id', async (req, res) => {
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedData);
});

app.delete('/data/:id', async (req, res) => {
    await Data.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

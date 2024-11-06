const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: String,
    value: Number,
    description: String,
});

module.exports = mongoose.model('Data', dataSchema);

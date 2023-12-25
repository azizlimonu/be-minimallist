const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    state: { type: Boolean, default: true },
    country: { type: String, required: false },
    recovery: { type: String, required: false },
    gender: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('customer', CustomerSchema);
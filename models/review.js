const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = Schema({
    stars: { type: Number, required: true },
    comment: { type: String, required: true },
    product: { type: Schema.ObjectId, ref: 'product', required: true },
    customer: { type: Schema.ObjectId, ref: 'customer', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('review', ReviewSchema);
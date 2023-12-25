const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = Schema({
    transaction: { type: String, required: true },
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    series: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Number, required: true },
    status: { type: String, required: true },
    customer: { type: Schema.ObjectId, ref: 'customer', required: true },
    address: { type: Schema.ObjectId, ref: 'address', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('sale', SaleSchema);
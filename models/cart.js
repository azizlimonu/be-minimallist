const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = Schema({
    product: { type: Schema.ObjectId, ref: 'product', required: true },
    variety: { type: Schema.ObjectId, ref: 'variety', required: true },
    quantity: { type: Number, required: true },
    customer: { type: Schema.ObjectId, ref: 'customer', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('cart', CartSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleDetailSchema = Schema({
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    supplier: { type: String, required: true },
    subtotal: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    sale: { type: Schema.ObjectId, ref: 'sale', required: true },
    customer: { type: Schema.ObjectId, ref: 'customer', required: true },
    product: { type: Schema.ObjectId, ref: 'product', required: true },
    variety: { type: Schema.ObjectId, ref: 'variety', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('sale_Detail', SaleDetailSchema);
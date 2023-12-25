const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceDetailSchema = Schema({
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    invoice: { type: Schema.ObjectId, ref: 'invoice', required: true },
    product: { type: Schema.ObjectId, ref: 'product', required: true },
    variety: { type: Schema.ObjectId, ref: 'variety', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('invoice_detail', InvoiceDetailSchema);
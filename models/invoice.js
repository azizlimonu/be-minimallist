const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = Schema({
    supplier: { type: String, required: true },
    invoiceNumber: { type: String, required: true },
    document: { type: String, required: true },
    totalAmount: { type: String, required: true },
    series: { type: Number, required: true },
    resultingAmount: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: 'user', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('invoice', InvoiceSchema);
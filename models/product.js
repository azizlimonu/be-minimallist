const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    cover: { type: String, required: true },
    stock: { type: Number, default: 0, required: true },
    variety: { type: String, required: true },
    state: { type: Boolean, required: true },
    discount: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, required: false }
});

module.exports = mongoose.model('product', ProductSchema);
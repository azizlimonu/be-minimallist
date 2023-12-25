const Cart = require('../models/cart');
const Variety = require('../models/variety');
const Address = require('../models/address');

const createProductInCart = async function (req, res) {
    if (req.user) {
        const data = req.body;
        const variety = await Variety.findById({ _id: data.variety }).populate('product');

        if (variety.product.price >= 1) {
            const cartItem = await Cart.create(data);
            res.status(200).send(cartItem);
        } else {
            res.status(200).send({ data: undefined, message: 'The product has a price of 0' });
        }
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const getCustomerCart = async function (req, res) {
    if (req.user) {
        const cart = await Cart.find({ customer: req.user.sub }).populate('product').populate('variety').sort({ createdAt: -1 }).limit(5);
        const overallCart = await Cart.find({ customer: req.user.sub }).populate('product').populate('variety').sort({ createdAt: -1 });
        res.status(200).send({ cart, overallCart });
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const removeProductFromCart = async function (req, res) {
    if (req.user) {
        const id = req.params['id'];
        const removedItem = await Cart.findByIdAndRemove({ _id: id });
        res.status(200).send(removedItem);
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const createCustomerAddress = async function (req, res) {
    if (req.user) {
        const data = req.body;
        data.customer = req.user.sub;
        const address = await Address.create(data);
        res.status(200).send(address);
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const getCustomerAddresses = async function (req, res) {
    if (req.user) {
        const addresses = await Address.find({ customer: req.user.sub });
        res.status(200).send(addresses);
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const removeCustomerAddress = async function (req, res) {
    if (req.user) {
        const id = req.params['id'];
        const removedAddress = await Address.findByIdAndDelete({ _id: id });
        res.status(200).send(removedAddress);
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

module.exports = {
    createProductInCart,
    getCustomerCart,
    removeProductFromCart,
    createCustomerAddress,
    getCustomerAddresses,
    removeCustomerAddress
}
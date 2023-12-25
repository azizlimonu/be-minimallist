const Product = require('../models/product');
const Variety = require('../models/variety');
const Category = require('../models/category');
const Gallery = require('../models/gallery');

const getNewProducts = async function (req, res) {
    var products = await Product.find({ state: true }).sort({ createdAt: -1 }).limit(4);
    res.status(200).send(products);
}

const getDiscountedProducts = async function (req, res) {
    var products = await Product.find({ discount: true, state: true }).limit(4);
    res.status(200).send(products);
}

const getShopProducts = async function (req, res) {
    var products = await Product.find({ state: true }).sort({ createdAt: -1 });
    var dataProducts = [];

    for (var item of products) {
        var varieties = await Variety.find({ product: item._id });

        dataProducts.push({
            title: item.title,
            slug: item.slug,
            category: item.category,
            price: item.price,
            description: item.description,
            cover: item.cover,
            varietyString: item.varietyString,
            state: item.state,
            discount: item.discount,
            createdAt: item.createdAt,
            varieties
        });
    }

    res.status(200).send(dataProducts);
}

const listShopCategories = async function (req, res) {
    var regs = await Category.find({ state: true }).sort({ title: 1 });
    var categories = [];

    for (var item of regs) {
        var products = await Product.find({ category: item.title });

        categories.push({
            category: item,
            numProducts: products.length
        });
    }

    res.status(200).send(categories);
}

const getProductBySlug = async function (req, res) {
    var slug = req.params['slug'];
    var product = await Product.findOne({ slug: slug });
    var varieties = await Variety.find({ product: product._id });
    var gallery = await Gallery.find({ product: product._id });

    res.status(200).send({ product, varieties, gallery });
}

const getProductByCategory = async function (req, res) {
    var category = req.params['category'];
    var products = await Product.find({ category: category }).limit(6);

    res.status(200).send({ products });
}

module.exports = {
    getNewProducts,
    getDiscountedProducts,
    getShopProducts,
    listShopCategories,
    getProductBySlug,
    getProductByCategory
}
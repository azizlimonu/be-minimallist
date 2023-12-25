const Product = require('../models/product');
const Category = require('../models/category');
const Gallery = require('../models/gallery');
const Variety = require('../models/variety');
const Invoice = require('../models/invoice');
const slugify = require('slugify');
const fs = require('fs');
const path = require('path');

const registerProductAdmin = async function (req, res) {
    if (req.user) {
        let data = req.body;
        let products = await Product.find({ title: data.title });
        console.log(products.length);

        if (products.length >= 1) {
            res.status(200).send({ data: undefined, message: 'Product name already exists.' });
        } else {
            // Product registration
            const imgPath = req.files.cover.path;
            const imgArray = imgPath.split('\\');
            const coverImage = imgArray[2];

            data.cover = coverImage;
            data.slug = slugify(data.title);

            try {
                let product = await Product.create(data);
                res.status(200).send({ data: product });
            } catch (error) {
                res.status(200).send({ data: undefined, message: 'Error saving the product.' });
            }
        }
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const listProductsAdmin = async function (req, res) {
    if (req.user) {
        let filter = req.params['filter'];
        let products = await Product.find({
            $or: [
                { title: new RegExp(filter, 'i') },
                { category: new RegExp(filter, 'i') }
            ]
        }).sort({ createdAt: -1 });
        res.status(200).send(products);
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const getProductCover = async function (req, res) {
    let img = req.params['img'];

    fs.stat('./uploads/products/' + img, function (err) {
        if (err) {
            let imgPath = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(imgPath));
        } else {
            let imgPath = './uploads/products/' + img;
            res.status(200).sendFile(path.resolve(imgPath));
        }
    });
}

const getProductAdmin = async function (req, res) {
    if (req.user) {
        let id = req.params['id'];

        try {
            let product = await Product.findById({ _id: id });
            res.status(200).send(product);
        } catch (error) {
            res.status(200).send(undefined);
        }
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const updateProductAdmin = async function (req, res) {
    if (req.user) {
        let data = req.body;
        let id = req.params['id'];
        let products = await Product.find({ title: data.title });
        console.log(products.length);

        if (products.length >= 1) {
            if (products[0]._id == id) {
                if (req.files) {
                    // Product registration
                    const imgPath = req.files.cover.path;
                    const imgArray = imgPath.split('\\');
                    const coverImage = imgArray[2];

                    data.cover = coverImage;
                    data.slug = slugify(data.title);

                    try {
                        let product = await Product.findByIdAndUpdate({ _id: id }, {
                            title: data.title,
                            category: data.category,
                            description: data.description,
                            variety: data.variety,
                            state: data.state,
                            discount: data.discount,
                            cover: data.cover
                        });
                        res.status(200).send({ data: product });
                    } catch (error) {
                        res.status(200).send({ data: undefined, message: 'Error saving the product.' });
                    }
                } else {
                    data.slug = slugify(data.title);

                    try {
                        let product = await Product.findByIdAndUpdate({ _id: id }, {
                            title: data.title,
                            category: data.category,
                            description: data.description,
                            variety: data.variety,
                            state: data.state,
                            discount: data.discount
                        });
                        res.status(200).send({ data: product });
                    } catch (error) {
                        res.status(200).send({ data: undefined, message: 'Error saving the product.' });
                    }
                }
            } else {
                res.status(200).send({ data: undefined, message: 'Product name already exists.' });
            }
        } else {
            if (req.files) {
                // Product registration
                const imgPath = req.files.cover.path;
                const imgArray = imgPath.split('\\');
                const coverImage = imgArray[2];

                data.cover = coverImage;
                data.slug = slugify(data.title);

                try {
                    let product = await Product.findByIdAndUpdate({ _id: id }, {
                        title: data.title,
                        category: data.category,
                        description: data.description,
                        variety: data.variety,
                        state: data.state,
                        discount: data.discount,
                        cover: data.cover
                    });
                    res.status(200).send({ data: product });
                } catch (error) {
                    res.status(200).send({ data: undefined, message: 'Error saving the product.' });
                }
            } else {
                data.slug = slugify(data.title);

                try {
                    let product = await Product.findByIdAndUpdate({ _id: id }, {
                        title: data.title,
                        category: data.category,
                        description: data.description,
                        variety: data.variety,
                        state: data.state,
                        discount: data.discount
                    });
                    res.status(200).send({ data: product });
                } catch (error) {
                    res.status(200).send({ data: undefined, message: 'Error saving the product.' });
                }
            }
        }
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const registerVarietyProduct = async (req, res) => {
    if (req.user) {
        let data = req.body;
        let variety = await Variety.create(data);
        res.status(200).send({ data: variety });
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const getVarietiesProduct = async function (req, res) {
    if (req.user) {
        let id = req.params['id'];
        let varieties = await Variety.find({ product: id }).sort({ stock: -1 });
        res.status(200).send(varieties);
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const deleteVarietyProduct = async function (req, res) {
    if (req.user) {
        let id = req.params['id'];
        let reg = await Variety.findById({ _id: id });
        if (reg.stock == 0) {
            let variety = await Variety.findByIdAndRemove({ _id: id });
            res.status(200).send(variety);
        } else {
            res.status(200).send({ data: undefined, message: 'This variety cannot be deleted.' });
        }
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const listActiveProductsAdmin = async function (req, res) {
    if (req.user) {
        let products = await Product.find({ state: true }).sort({ createdAt: -1 });
        res.status(200).send(products);
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const registerIncomeAdmin = async function (req, res) {
    if (req.user) {
        let data = req.body;
        let details = data.details;

        const imgPath = req.files.document.path;
        const imgArray = imgPath.split('\\');
        const documentImage = imgArray[2];
        data.document = documentImage;
        data.user = req.user.sub;

        let invoice = await Invoice.create(data);
        res.status(200).send(invoice);
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const uploadProductImageAdmin = async function (req, res) {
    if (req.user) {
        let data = req.body;

        // Product registration
        const imgPath = req.files.image.path;
        const imgArray = imgPath.split('\\');
        const productImage = imgArray[2];

        data.image = productImage;

        try {
            let image = await Gallery.create(data);
            res.status(200).send(image);
        } catch (error) {
            res.status(200).send({ data: undefined, message: 'Error saving the product.' });
        }
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const getProductGallery = async function (req, res) {
    let img = req.params['img'];

    fs.stat('./uploads/gallery/' + img, function (err) {
        if (err) {
            let imgPath = './uploads/default.jpg';
            res.status(200).sendFile(path.resolve(imgPath));
        } else {
            let imgPath = './uploads/gallery/' + img;
            res.status(200).sendFile(path.resolve(imgPath));
        }
    });
}

const getProductGalleryAdmin = async function (req, res) {
    if (req.user) {
        let id = req.params['id'];
        let gallery = await Gallery.find({ product: id });
        res.status(200).send(gallery);
    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const deleteProductGalleryAdmin = async function (req, res) {
    if (req.user) {
        let id = req.params['id'];

        try {
            let reg = await Gallery.findById({ _id: id });
            let imgPath = './uploads/gallery/' + reg.image;
            fs.unlinkSync(imgPath);
            let gallery = await Gallery.findByIdAndDelete({ _id: id });
            res.status(200).send(gallery);
        } catch (error) {
            res.status(200).send({ data: undefined, message: 'Error deleting the image.' });
        }

    } else {
        res.status(500).send({ data: undefined, message: 'TokenError' });
    }
}

const createCategoryAdmin = async function (req, res) {
    if (req.user) {
        let data = req.body;

        try {
            var reg = await Category.find({ title: data.title });

            if (reg.length == 0) {
                data.slug = slugify(data.title).toLowerCase();
                var category = await Category.create(data);
                res.status(200).send(category);
            } else {
                res.status(200).send({ data: undefined, message: 'The category already exists.' });
            }
        } catch (error) {
            res.status(200).send({ data: undefined, message: 'An error occurred during the process.' });
        }
    } else {
        res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
}

const listCategoriesAdmin = async function (req, res) {
    if (req.user) {
        let regs = await Category.find().sort({ title: 1 });
        let categories = [];

        for (let item of regs) {
            const products = await Product.find({ category: item.title });

            categories.push({
                category: item,
                numProducts: products.length
            });
        }

        res.status(200).send(categories);

    } else {
        res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
}

const changeProductStateAdmin = async function (req, res) {
    if (req.user) {
        let id = req.params['id'];
        let data = req.body;
        let newState = !data.state;

        let category = await Category.findByIdAndUpdate({ _id: id }, {
            state: newState
        });

        res.status(200).send(category);
    } else {
        res.status(500).send({ data: undefined, message: 'ErrorToken' });
    }
}

module.exports = {
    registerProductAdmin,
    listProductsAdmin,
    getProductCover,
    getProductAdmin,
    updateProductAdmin,
    registerVarietyProduct,
    getVarietiesProduct,
    deleteVarietyProduct,
    listActiveProductsAdmin,
    registerIncomeAdmin,
    uploadProductImageAdmin,
    getProductGallery,
    getProductGalleryAdmin,
    deleteProductGalleryAdmin,
    createCategoryAdmin,
    listCategoriesAdmin,
    changeProductStateAdmin
}

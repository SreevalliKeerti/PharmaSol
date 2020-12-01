const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Product not found in DB"
                });
            }
            req.product = product;
            next();
        });
};

//create contoller
exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image"
            });
        }

        //Destructure the fields
        const { name, description, price, category, stock, } = fields;

        if (!name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(400).json({
                error: "Do fill all the fields"
            });
        }

        let product = new Product(fields);

        //Handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //Save to DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Saving product in DB failed"
                });
            }
            res.json(product);
        });
    });
};

//read controller
exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

//middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

//update controller
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image"
            });
        }

        //updation part
        let product = req.product;
        product = _.extend(product, fields);

        //Handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size is too big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //Save to DB
        product.save((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Updation of product failed"
                });
            }
            res.json(product);
        });
    });
};

//delete controller
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: `Failed to delete the ${deletedProduct.name} product`
            });
        }
        res.json({
            message: "Deletion was successful",
            deletedProduct
        });
    });
};

//listing of products
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 30;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([
            [sortBy, "asc"]
        ])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "No product found"
                });
            }
            res.json(products);
        });
};

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "No category found"
            });
        }
        res.json(category);
    });
};

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { stock: -item.count, sold: +item.count } }
            }
        };
    });

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation failed"
            });
        }
        next();
    });
};
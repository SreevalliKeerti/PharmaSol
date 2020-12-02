const { Order, ProductCart } = require("../models/order");
const User = require("../models/user");
const { getUserById } = require("./user");

exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
        .populate("products.product", "name price")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No order found in DB"
                });
            }
            req.order = order;
            next();
        });
};

exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((err, order) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to save your order in DB"
            });
        }
        res.json(order);
    });
};

exports.getAllOrders = (req, res) => {
    Order.find()
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No orders found in DB"
                });
            }
            res.json(order);
        });
};

exports.getOrders = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name purchases")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No orders found in DB"
                });
            }
            res.json(order);
        });
};

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

const updateStatusForUser = (userId, updatedstatus) => {
    User.findById({ user: userId })
        .populate("user", "_id name")
        .exec((err, array) => {
            if (err) {
                //
            }
            console.log(array);
            //return res.json(order);
        });
};

exports.updateStatus = (req, res) => {
    Order.findByIdAndUpdate({ _id: req.order._id }, { $set: { status: req.body.status } }, { new: true, useFindAndModify: false },
        (err, order) => {
            if (err) {
                console.log("Cant update");
            }
            order.products.forEach(product => {
                    User.findById(order.user._id, (err, info) => {
                        if (err) {
                            console.log(err);
                        } else {
                            //console.log(info.purchases);
                            info.purchases.forEach(purchase => {
                                    if (purchase._id == product._id) {
                                        purchase.status = order.status;
                                        //console.log("product" + product._id);
                                        //console.log("purchase" + purchase.status);
                                        User.updateOne({ _id: order.user._id, 'purchases._id': purchase._id, 'purchases.quantity': product.count }, { '$set': { 'purchases.$.status': purchase.status } }, { new: true, useFindAndModify: false },
                                            (err, arr) => {
                                                if (err) {
                                                    console.log(err)
                                                }
                                            });
                                    }
                                })
                                //console.log(info);
                        }
                    });
                })
                //console.log(order);
            res.json(order);
        }
    );
};
const { Order, ProductCart } = require("../models/order");

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

exports.getOrderStatus = (req, res) => {
    res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
    /*const order = req.order;
    order.status = req.body.status;

    order.save((err, updatedStatus) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to update status"
            });
        }
        res.json(updatedStatus);
    });*/
    Order.findByIdAndUpdate({ _id: req.order._id }, { $set: { status: req.body.status } }, { new: true, useFindAndModify: false },
        (err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "Cannot update order status"
                });
            }
            res.json(order);
        }
    );
};
const User = require("../models/user");
const { Order } = require("../models/order");

var currentDate = new Date();

var date = currentDate.getDate();
var month = currentDate.getMonth(); //Be careful! January is 0 not 1
var year = currentDate.getFullYear();

var dateString = date + "-" + (month + 1) + "-" + year;

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {

    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err) {
            return res.status(400).json({
                error: "Not category found in DB"
            });
        }
        res.json(users);
    });
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "You are not authorized to update this info"
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    );
};

exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate("user", "_id name")
        .exec((err, order) => {
            if (err) {
                return res.status(400).json({
                    error: "No order in this user account"
                });
            }
            return res.json(order);
        });
};

exports.pushOrderinPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.count,
            amount: product.price,
            status: req.body.order.status,
            totalamount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id,
            purchasedAt: currentDate.toString()
        });
    });

    //Store this in DB
    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { purchases: purchases } }, { new: true },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchase list"
                });
            }
            next();
        }
    );
};
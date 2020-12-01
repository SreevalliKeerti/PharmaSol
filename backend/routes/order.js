const express = require("express");
const router = express.Router();

const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderinPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//actual routes
//create
router.post("/order/create/:userId", isSignedIn, isAuthenticated, pushOrderinPurchaseList, updateStock, createOrder);

//read
router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders);

//order status
router.get("/order/status/:userId", isSignedIn, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/status/:orderId/:userId", isSignedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router;
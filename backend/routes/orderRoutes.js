const express = require("express");
const {createOrder,getOrder,myOrders,updateOrderStatus} = require("../controller/orderController")

// midleweare
const {admin} = require("../middleware/adminMiddleware");
const {protect} = require("../middleware/authMiddleware");

const router = express.Router();

// Routes
router.route("/").post(protect,createOrder).get(protect,admin,getOrder);
router.route("/myorders").get(protect,myOrders)
router.route("/:id/status").put(protect,updateOrderStatus);

module.exports = router;
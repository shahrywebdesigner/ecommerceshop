// models
const userSchema = require("../model/userSchema");
const productSchema = require("../model/productSchema");
const orderSchema = require("../model/orderSchema");

const getAdminStats = async (req,res)=> {
    try{
        const totalUsers = await userSchema.countDocuments({role:'user'});
        const totalProducts = await productSchema.countDocuments({});
        const totalOrders = await orderSchema.countDocuments({});

        const orders = await orderSchema.find({});

        const totalRevenueData = orders.reduce((acc,order) =>acc + order.totalamount,0); 

        res.json({
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue: totalRevenueData
        })
    }catch(error){
        res.status(500).json({
            message: 'error fetching stats',error
        })
    };
};

module.exports = {getAdminStats};
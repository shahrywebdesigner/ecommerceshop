const orderSchema = require("../model/orderSchema");
const sendEmail = require ("../utils/sendEmail");

const createOrder = async (req,res)=>{
    try{
        const {items,totalamount,address,paymentid} = req.body;
        if(!items|| items.length === 0 || !totalamount || !address){
            return res.status(400).json({
                message:"invalid order details"
            })
        }else{
                const order = new orderSchema({
                    user:req.user._id,
                    items,
                    totalamount,
                    address,
                    paymentid
                });
                await order.save();
                
                const addressString = `${address.fullname}, ${address.street}, ${address.city}, ${address.country}`;
        
                const message = `Dear ${req.user.name},\n\nThank you for your order! Your order has been successfully created:\n\nOrder ID: ${order._id}\nTotal Amount: $${totalamount}\nShipping Address: ${addressString}\n\nWe will notify you once your order is shipped.\n\nBest regards,\nEcommerceShop Team`;
                await sendEmail(req.user.email,'Order Created',message) 
                res.status(201).json({
                    message:'Order Create Sucessfully',order
                })
            }
    }catch(error){
        res.status(500).json({
            message:"Error creating order"
        })
    }
};

// get my Orders 
const myOrders = async (req,res)=>{
    try{
        const orders = await orderSchema.find({user:req.user._id}).populate('items.productid','name price');
        res.status(200).json(orders)
    }catch(error){
        res.status(500).json({
            message:"error fetching orders".error
        })
    }
};

// get all orders 
const getOrder = async (req,res)=>{
    try{
        const orders = await orderSchema.find({}).populate('user','id name').populate('items.productid','name price')
        res.json(orders)
    }catch(error){
        res.status(500).json({
            message:"error fetching orders",error
        })
    }
}

// update order status
const updateOrderStatus = async (req,res)=>{
    try{
        const {status} = req.body;
        const order = await orderSchema.findById(req.params.id);
        if(order){
            order.status = status,
            await order.save();
            console.log(order);
            res.json({
                message:'order status updated',order
            })
        }else{
            res.status(404).json({
                message:'order not found'
            })
        }
    }catch(error){
        res.status(500).json({
            message:' error update order status',error
        })
    }
}



module.exports = {
    createOrder,
    myOrders,
    getOrder,
    updateOrderStatus
}
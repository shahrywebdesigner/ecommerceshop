const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, ref:"User",required: true,
    },
    items:[
        {
            productid:{type: mongoose.Schema.Types.ObjectId, ref:"products",required:true},
            qty:{type:Number,required:true,min:1},
            price:{type:Number,required:true}

        }
    ],
    totalamount: { type:Number,required:true},
    address:{
        fullname:{type:String,required:true},
        street:{type:String,required:true},
        city:{type:String,required:true},
        postcode:{type:String,required:true},
        country:{type:String,required:true},
    },
    paymentid:{type:String},
    status:{type:String,enum:["pending","shipped","delivered"],default:"pending"}
},{timestamps:true})

const order = mongoose.model("orders",orderSchema)

module.exports = order;
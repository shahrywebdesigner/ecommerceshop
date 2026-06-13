const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {type:String ,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    category: {type:String,required:true},
    stock: {type:Number,required:true},
    images: [{type:String,required:true}],
    createdAt: {type: Date,required:true, default:Date.now},
    rating: {type:Number, default:0},
    numreviews: {type:Number, default:0}
});

const product = mongoose.model("products",productSchema);
module.exports = product;
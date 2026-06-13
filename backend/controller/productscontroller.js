const productSchema = require("../model/productSchema");
const cloudinary = require("../config/cloudinary");


const getProducts = async (req, res) => {
  try {
    const products = await productSchema.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "server error",
    });
  }
};

const getProductById = async (req,res)=>{
    try{
        const product = await productSchema.findById(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({
                message:"product is not found"
            })
            
        }
    }catch(error){
        res.status(500).json({
            message:"server error"
        })
    };
};

const createProducts = async (req,res)=>{
    try{
    const {name, description,price, category, stock} = req.body;
    let images = [];
    if(req.file){
        const result = await cloudinary.uploader.upload(req.file.path);
        images .push(result.secure_url);
    }
        const product = new  productSchema({
            name,
            description,
            price, 
            category, 
            stock,
            images
        });
        const productSaved = await product.save();
        res.status(201).json(productSaved);
    }catch(error){
        console.error("Database or Cloudinary Error:", error);
    res.status(500).json({
        message: "server error",
        error: error.message // Yeh line aapko real error batayegi
    });
    }
};

const updateProduct = async (req,res)=>{
    try{
        const {name,description, price, category,stock} = req.body;
        const product = await productSchema.findById(req.params.id);
        if(product){
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price|| product.price;
            product.category = category|| product.category;
            product.stock  = stock || product.stock;
            if(req.file){
                const result = await cloudinary.uploader.upload(req.file.path);
                product.images = [result.secure_url]; 
            }
            const productSaved = await product.save()
            res.status(200).json(productSaved)
        }else{
            res.status(404).json({
                message:"product not found"
            })
        };
    }catch(error){
        res.status(500).json({
            message:"server error"
        })
    }
};

const deleteProduct = async (req,res)=>{
    try{
        const product = await productSchema.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.json({
                message:"product delete sucessfully"
            })
        }else{
            res.status(404).json({
                message:"product not found"
            })

        }
    }catch(error){
        res.status(500).json({
            message:"server error"
        })
    }
}
module.exports = {getProducts,getProductById,createProducts,updateProduct,deleteProduct}
const express = require("express");
const multer = require("multer");
const upload = multer({dest:"uploads/"})

const router = express.Router();
// Controllers
const {getProducts,createProducts,getProductById,updateProduct,deleteProduct} = require("../controller/productscontroller")

// middleweare
const {protect} = require("../middleware/authMiddleware")
const {admin} = require("../middleware/adminMiddleware")


// Routes defien
// one way
// router.post('/login',loginUser)
// router.get('/users',protect,admin,getUser)

// second way
router.route('/').get(getProducts).post(protect,admin,upload.single('images'), createProducts);
router.route("/:id").get(getProductById).put(protect,admin, upload.single('images'), updateProduct).delete(protect,admin,deleteProduct)


module.exports = router;
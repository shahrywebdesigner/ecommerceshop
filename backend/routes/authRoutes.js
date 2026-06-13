const express = require("express");

const router = express.Router();
// Controllers
const {registerUser,loginUser,getUser,verifyOtp, resendOtp} = require("../controller/registerUser")

// middleweare
const {protect} = require("../middleware/authMiddleware")
const {admin} = require("../middleware/adminMiddleware")


router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/users',protect,admin,getUser)
router.post("/verify-otp", verifyOtp)
router.post("/resend-otp", resendOtp);

module.exports = router;
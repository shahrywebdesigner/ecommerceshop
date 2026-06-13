const userSchema = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail")


const registerUser = async (req,res)=> {
    const {name,email,password} = req.body
    try{
        const isUserExist = await userSchema.findOne({email});
        if(isUserExist){
            return res.status(400).json({message:"user already exist"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        // otp genrate
        const otp = Math.floor(100000 + Math.random()*900000).toString();
        const otpExpires = new Date(Date.now() + 15 * 60 * 1000);
        const user = await userSchema.create( {name,email,password:hashPassword, otp: otp, otpExpires: otpExpires});

        // token
        const token = jwt.sign({id: user._id, email: user.email},process.env.JWT_SECRET,{ expiresIn: "1d" }) 

        if(user){
            const message = `Welcome to Ecommerceshop,${name}! Thank you for registering with us. Your OTP for Ecommerce registeration is: ${otp} `;

            await sendEmail(email,'Welcome to Ecommerce- your OTP for resgisteration',message)

            res.status(201).json({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token:token
            })
        }else{
            return res.status(400).json({
                message:"Invalid user data"
            })
        }
    }catch(error){
        res.status(500).json({ message: "Server error" })
    }
}; 

// login user
const loginUser = async (req,res)=>{
    const { email,password } = req.body;
    try{
        const user = await userSchema.findOne({email});
        
        if(user && (await bcrypt.compare(password, user.password))){
            
            if (!user.verified) {
                return res.status(401).json({ message: "Please verify your email first before logging in." });
            }
            const token = jwt.sign({id: user._id, email: user.email},process.env.JWT_SECRET,{ expiresIn: "1d" }) 

            res.status(200).json({
                id:user._id,
                name:user.name,
                email: user.email,
                role: user.role,
                token: token
            })
        }else{
           return res.status(400).json({
                message: "Invali Email or Password"
            })
        }
    }catch(error){
        res.status(500).json({
            message: "Server Error"
        })
    }
}

// get user

const getUser = async (req,res)=>{
    try{
      const user = await userSchema.find({}).select('-password');
      res.json(user)

    }catch(error){
        res.status(500).json({
            message: 'server error'
        })
    }
};

// 3. VERIFY OTP FUNCTION
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        // User ko find karein email ke zariye
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // 1. Check karein ke OTP expire to nahi hua
        if (user.otpExpires < new Date()) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        // 2. Check karein ke user ka bheja hua OTP database wale OTP se match karta hai
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP. Please check again." });
        }

        user.verified = true;

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Email verified successfully! You can now log in." });

    } catch (error) {
        res.status(500).json({ message: "Server error during OTP verification" });
    }
};

// RESEND OTP CONTROLLER
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check karein ke kya user exist karta hai?
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 2. Check karein ke kahin user pehle se hi verified to nahi?
    if (user.verified) {
      return res.status(400).json({ message: "This account is already verified. Please login." });
    }

    // 3. Naya 6-digit ka OTP code generate karein
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 4. Naya expiry time set karein (e.g., 5 minutes ke liye)
    const newOtpExpire = new Date(Date.now() + 5 * 60 * 1000);

    // 5. Database mein user ke record ko naye OTP ke sath update karein
    user.otp = newOtp;
    user.otpExpires = newOtpExpire;
    await user.save();

    const message = `Your new OTP for Ecommerce registration is: ${newOtp}`;
    await sendEmail(email, "Ecommerce OTP Verification", message);

    res.status(200).json({ message: "A fresh OTP has been sent to your email/console." });

  } catch (error) {
    res.status(500).json({ message: "Server error while resending OTP." });
  }
};




module.exports = {registerUser,loginUser,getUser,verifyOtp, resendOtp}

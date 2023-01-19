const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const protect =expressAsyncHandler( async (req,res,next)=>{
    try {
        const decoded = jwt.verify(req.body.token,process.env.JWT_KEY);
        const user = await User.findById(decoded.id);
        req.userData = {
            id:user._id,
            email:user.email
        };
        next();
    } catch (error) {
        return res.status(404).json({
            message:"Auth Failed"
        })
    }
    

});

module.exports = protect;
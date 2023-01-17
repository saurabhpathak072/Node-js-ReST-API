const expressAsyncHandler = require('express-async-handler');

const User = require('../models/user');

const deleteUser = expressAsyncHandler( async (req,res)=>{
    const {userId} = req.params;
    try {
        const result  = await User.remove({_id:userId})
    if(result){
        res.status(200).json({
            message:"User deleted",
            result
        })
    }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
    
});

module.exports ={
    deleteUser
}
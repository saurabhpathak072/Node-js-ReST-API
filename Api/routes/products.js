const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.post('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Handling POST requests to /products'
    })
})

router.get('/:productId',(req,res,next)=>{
    console.log(req.params)
    const id = req.params.productId;

    if(id === 'special')
        res.status(200).json({
            message: 'Handling GET requests to /products/:productId',
            id
        })
    else    
        res.status(200).json({
            message: "You Passed random ID"
        })
})

router.patch('/:productId',(req,res,next)=>{
    res.status(200).json({
        message: 'Updated the Product'
    })
})

router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message: 'Deleted the Product'
    })
})



module.exports = router;
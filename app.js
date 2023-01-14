const express = require('express');
const app =  express();
const morgan = require('morgan');

const productRoutes = require('./Api/routes/products')
const orderRoutes = require('./Api/routes/orders')

// Logger for node js
app.use(morgan('dev'))

// Routes which should handle request
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

// Error Handling
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message : error.message
        }
    })
})

module.exports = app;

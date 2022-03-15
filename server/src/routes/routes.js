//import express and router
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const restaurantRoutes = require('./restaurantRoutes');

//Import controllers 
const RestaurantController = require('../controllers/restaurantController');
const RestaurantPolicy = require('../policies/RestaurantPolicy');


module.exports = () => {
    router.get('/', (req, res) => {
        res.send('Welcome to the Foodies API');
    });

    router.use('/auth', authRoutes());
    router.use('/restaurants', restaurantRoutes());
 
    return router
}

//import express and router
const express = require('express');
const router = express.Router(); 

const RestaurantController = require('../controllers/restaurantController');
const RestaurantPolicy = require('../policies/RestaurantPolicy');

module.exports = () => {
   //Additional sub-routes
router.get('/',
RestaurantController.getRestaurants
 );

 //Post route
 router.post('/',
 RestaurantPolicy.validateRestaurant,
   RestaurantController.postRestaurant
 );

 // Get by ID Route
 router.get('/:id',
    RestaurantController.getRestaurantById
 );

 router.put('/:id',
 RestaurantController.putRestaurantById
);

 router.delete('/:id',
 RestaurantController.deleteRestaurantById
 );

 return router
}
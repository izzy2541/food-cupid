//import express and router
const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController')

module.exports = () => {
    router.post('/register',
      AuthController.register
    );

    router.post('/login',
    AuthController.login
  );

  return router
}
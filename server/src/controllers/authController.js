// Import custom modules & configurations 
const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError');
const { findUser, hashPassword, comparePassword, userDetailsToJSON, jwtSignUser } = require('../utilities/authServices');

module.exports = {
  // [1] REGISTER: POST
  async register(req, res, next){
    try {
      // (a) Destructure specific properties for use
      console.log(req.body);
      const { username, email, password } = req.body;

      // (b) Validation: Block matching user email
      // NOTE: We want unique email registered to account
      const userMatch = await findUser(email);
      if( userMatch.length === 1 ){
        return next(ApiError.badRequest('This email is already in use'));
      } 

      // (c) Save new user to database
      // NOTE: If the "add" fails, it will return an error, so we do NOT have to check for a success response
      const usersRef = db.collection('users'); 
      const response = await usersRef.add({
        username: username,
        email: email,
        password: await hashPassword(password),
        isAdmin: false
      });

      // (d) Confirm Registration & Convert user details to JSON
      console.log(`Success - User: ${response.id} registered!`);
      const userJSON = await userDetailsToJSON(response.id);

      // (e) Return user object + token
      // NOTE: jwtSignUser passes the user data to jwtSignUser to be stored into the token
      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON)
      });

    } catch (err) {
      return next(ApiError.internal('Your user profile could not be registered', err));
    }
  },

  // [2] LOGIN: POST
  async login(req, res, next){
    try {
      // (a) Destructure specific properties for use
      const { email, password } = req.body; 
      
      // (b) Validation: Block non-matching user email
      // NOTE: We want unique email registered to account
      const userMatch = await findUser(email);

      if (userMatch.length === 0){
        return next(ApiError.badRequest('The credentials entered are not correct (DEBUG: email)'));
      }

      // (c) Validation: Block non-matching passwords
      const passwordMatch = await comparePassword(userMatch, password);
      if (!passwordMatch) {
        return next(ApiError.badRequest('The credentials entered are not correct (DEBUG: password)')); 
      }

      // (d) Confirm Login & Convert User Details to JSON
      console.log(`Success - User: ${userMatch[0].id} is logged in!`);
      const userJSON = await userDetailsToJSON(userMatch[0].id);

      // (e) Return user object + token
      res.send({
        user: userJSON,
        token: jwtSignUser(userJSON)
      });

    } catch (err) {
      return next(ApiError.internal('Your user profile cannot be logged into at this time', err));
    }

  }
}
// Export module
module.exports = {
    port: process.env.PORT || 5000,
  
    //Application secret for creating a secure web token
    authentication: {
      jwtSecret: process.env.JWT_SECRET || 'password'
    }
  }
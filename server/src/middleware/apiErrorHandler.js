//Error Handling Middleware

const ApiError = require('../utilities/ApiError');

function apiErrorHandler(err, req, res, next) {
    if(err instanceof ApiError){
        res.status(err.code).json(err.message);
        return;

    } else {
    console.error(err);
    res.status(500).json({
        message: 'Oops! Something went wrong!'
    });
  }   
}



module.exports = apiErrorHandler;
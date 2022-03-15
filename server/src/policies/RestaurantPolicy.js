const Joi = require('joi');
const ApiError = require('../utilities/ApiError');

module.exports = {
    validateRestaurant(req, res, next){
                const schema = Joi.object({
                  avgRating: Joi.number().required(),
                  city: Joi.string().min(3).max(50).required(),
                  cuisine: Joi.string().required(),
                  price: Joi.number().required(),
                  restaurantImage: Joi.string(),
                  restaurantName: Joi.string().min(2).max(50).required()
                });
       

        const { error, value } = schema.validate(req.body);

        //set responses for error and success
        if ( error ) {
           switch(error.details[0].context.key){
            case 'avgRating':
                next(ApiError.badRequest('You must provide a restaurant rating'))
                break
            case 'city':
                next(ApiError.badRequest('You must provide a city'))
                break
            case 'cuisine':
                next(ApiError.badRequest('You must provide a cuisine'))
                break
            case 'price' :
                next(ApiError.badRequest('You must provide a price'))
                break
            case 'restaurantImage' :
                next(ApiError.badRequest('The existing image URL or path is not in a valid format - please re-upload the image'))
                break
            case 'restaurantName' :
                next(ApiError.badRequest('You must provide a restaurantName'))
                break
            
            default:
            next(ApiError.badRequest('Invalid Form Information - please check form information and submit again'))
            
           }
        } else {
          next();
        }
    }
}
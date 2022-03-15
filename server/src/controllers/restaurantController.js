const { db } = require('../config/db');
const ApiError = require('../utilities/ApiError')
const { fileServerUpload, storageBucketUpload, validateFile, getFilePathFromUrl, deleteFileFromBucket  } = require('../utilities/fileServices');



module.exports = {
// GET ALL RESTAURANT DATA
    async getRestaurants(req, res, next){
        try{
        const restaurantRef = db.collection('restaurants')
        const snapshot = await restaurantRef.orderBy("restaurantName", "asc").limit(15).get();

        //const snapshot = await restaurantRef.where("city", "==", "Melbourne").orderBy("restaurantName", "asc").limit(15).get();

        //  const restaurantRef = db.collection('restaurants')
        //const snapshot = await restaurantRef.where("city", "==", "Melbourne").orderBy("restaurantName", "desc").limit(15).get();

        if (snapshot.empty){
            return next(ApiError.badRequest('The restaurants you were looking for do not exist'));
        } else {
        let docs = [];
        snapshot.forEach(doc => {
            docs.push({
            id: doc.id,
            avgRating: doc.data().avgRating,
            city: doc.data().city,
            cuisine: doc.data().cuisine,
            price: doc.data().price,
            restaurantName: doc.data().restaurantName,
            restaurantImage: doc.data().restaurantImage
            });
        });
        res.send(docs);
         }
        } catch(err) {
         return next(ApiError.internal('Your request could not be processed at this time'
         ,err));
        }
    },

    //POST RESTAURANTS
    async postRestaurant(req, res, next){
        //a-text validation
        // b-authorisation

        //c File validation
      err = validateFile( req.files, 1000000);
      if(err) {
        console.log(err);
        return next(ApiError.badRequest(`Your image does not meet requirements - ${err.message}`));
      }


        //save image url to storage bucket 
      let downloadURL = null;
      try {
        //server-upload
        const fileName = fileServerUpload(req.files.restaurantImage);


        downloadURL = await storageBucketUpload(fileName);
      } catch(err) {
        return next(ApiError.internal('Internal Server Error: An error occurred in uploading the image to storage', err));
      }
        try{
            const restaurantRef = db.collection('restaurants')
            const response = await restaurantRef.add({
                avgRating: Number(req.body.avgRating),
                city: req.body.city,
                cuisine: req.body.cuisine,
                price: Number(req.body.price),
                restaurantName: req.body.restaurantName,
                restaurantImage: downloadURL
            });
            console.log('Added Restaurant with ID:', response.id);
            res.send(response.id);
        }catch(err) {
            return next(ApiError.internal('Your request could not be processed at this time'
         ,err));
        }
        },

    //Get by ID
    async getRestaurantById(req, res, next){
        try {
        const restaurantRef = db.collection('restaurants').doc(req.params.id);
        const doc = await restaurantRef.get();
            //400 error
        if (!doc.exists){
            return next(ApiError.badRequest('The Restaurant you were looking for does not exist!'));
            
        } else {
        res.send(doc.data());
        } 
     } catch(err) {
        return next(ApiError.internal('Your request could not be processed at this time'
        ,err));
     }
    },

  // [4] PUT restaurant BY ID
  async putRestaurantById(req, res, next){
    try {
      console.log(req.body);

      // NEW: Save Image URL to Storage Bucket
      let downloadURL = null;
      if (req.files){
        // (i) File Validation
        err = validateFile( req.files, 1000000 );
        if(err){
          console.log(err)
          return next(ApiError.badRequest(`Your image does not meet requirements - ${ err.message }`)); 
        }

        // (ii) File Upload
        try {      
          // Server-Upload
          console.log(`Updating image in DB`);
          const fileName = fileServerUpload(req.files.restaurantImage);

          // Storage-Upload
          downloadURL = await storageBucketUpload(fileName);

          // (iii) Delete OLD image version in Storage Bucket, if it exists
          if (req.body.filePath) {
          console.log(`Deleting old image in storage: ${req.body.filePath}...`);
          const bucketResponse = await deleteFileFromBucket(req.body.filePath);
            }

        } catch(err) {
          return next(ApiError.internal('Internal Server Error: An error occurred in uploading the image to storage', err));
        }
      } else {
        console.log('No change to image in DB');
        downloadURL = req.body.restaurantImage;
      }
     

      // Store the food document query in variable & call UPDATE method for ID
      const restaurantRef = db.collection('restaurants').doc(req.params.id);
      const response = await restaurantRef.update({
        avgRating: Number(req.body.avgRating),
        city: req.body.city,
        cuisine: req.body.cuisine,
        price: Number(req.body.price),
        restaurantName: req.body.restaurantName,
        restaurantImage: downloadURL
      });
      res.send(response);

     

    // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('Your request could not be processed at this time', err));
    }
  },

  // [5] DELETE restaurants BY ID
  async deleteRestaurantById(req, res, next){
    // (a) Delete document-restaurantImage file from storage 
    try {
      // (i) Store the restaurant document query in variable & call GET method for ID
      const restaurantRef = db.collection('restaurants').doc(req.params.id);
      const doc = await restaurantRef.get();

      // [400 ERROR] Check for User Asking for Non-Existent Documents
      if (!doc.exists) {
        return next(ApiError.badRequest('The restaurants item you were looking for does not exist'));
      } 
    console.log(doc.data());
      
      
      // (ii) Store downloadURL and obtain filePath in storage bucket
      const downloadURL = doc.data().restaurantImage;
      const filePath = getFilePathFromUrl(downloadURL);


      

      // Call storage bucket delete function & delete specified filepath
      const bucketResponse = await deleteFileFromBucket(filePath);

      // (b) Delete document from Cloud Firestore
      if (bucketResponse) {
        // Call DELETE method for ID (with PRECONDITION parameter to check document exists)
        // NOTE: We defined foodRef earlier!
        const response = await restaurantRef.delete({exists:true});
        res.send(response);
      }

    // [500 ERROR] Checks for Errors in our Query - issue with route or DB query
    } catch(err) {
      return next(ApiError.internal('A server error occurred while deleting this image - please try again later', err));
    }
  }
}
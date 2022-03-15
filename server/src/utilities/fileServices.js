// STORAGE BUCKET UTILITY SERVICES

// Import in modules
const { bucket } = require('../config/db');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

module.exports = {

  fileServerUpload(file) {
    console.log(file);

    //unique file name
    const fileName = Date.now() + "" + file.name;
    console.log(`Unique Filename: ${fileName}`);

    //declare server storage file path
    const filePath = path.join(
      __dirname,
      '../../',
      `/public/uploads/${fileName}`
    );

    file.mv(filePath);
    console.log(`Server Uploaded File Path: ${filePath}` );

    return fileName;
  },

  async storageBucketUpload(fileName){
    console.log(`File name: ${fileName}`);

    // (a) Generate random token (uuid)
    const storageToken = uuid.v4();
    console.log(storageToken);

    // (b) Declaring filepath + options
    const filePath = `./public/uploads/${fileName}`;
    const destFileName = fileName;

    const options = {
      destination: destFileName,
      resumable: true,
      validation: 'crc32c',
      metadata: {
        metadata: {
          firebaseStorageDownloadTokens: storageToken
        },
      }
    };

    // (c) Call Firebase Image Upload Function to save to storage bucket
    const result = await bucket.upload(filePath, options);

    // (d) Obtain bucket storage bucket name from our upload result
    const bucketName = result[0].metadata.bucket;
    console.log(`Bucket Name: ${bucketName}`);

    // (e) Construct our Dynamic URL
    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${destFileName}?alt=media&token=${storageToken}`;
    fs.unlink(
      filePath, err => {
        if(err) {
          return({
            message: 'Error occurred in removing file from temporary local storage'
          });
        } else {
         console.log("File in temporary local storage deleted ");
        }
      });
    
    return downloadURL;
  },

  getFilePathFromUrl(downloadURL){
    console.log(`Download from DB: ${downloadURL}`);

    // 1. slice off base url
    const baseURL = 'https://firebasestorage.googleapis.com/v0/b/foodie-bb739.appspot.com/o/'
    let filePath = downloadURL.replace(baseURL,"");

    //2 remove everything after the query string
    const indexOfEndPath = filePath.indexOf("?");
    filePath = filePath.substring(0, indexOfEndPath)

    //3 return filepath
    console.log(`File in Bucket for Deletion ${filePath}`)
    return filePath;
  },

  async deleteFileFromBucket(filePath){
    console.log(filePath)
    //check file exists in storage
    const file = bucket.file(filePath);
    const fileChecker = await file.exists();
    console.log(fileChecker);

    //Program the 400 error
    if (fileChecker[0] === false) {
      //toggle
      const options = {
        ignoreNotFound: false,
      };
      const data = await file.delete(options);
      console.log(`The file: ${filePath}, does not exist in Storage. Please check server for inconsistent data handling & database queries`);

      //return data value
      return data[0];
      
    } else {
      //standard delete request
      const data = await file.delete();
      console.log(`File deleted from Storage Bucket: ${filePath}`)
    return data[0];
    }
  },


  validateFile( file, maxSize ) {
    // a check file exists
    if(file=== null){
      return({
        message: 'No File Uploaded'
      });
    }

    //b check if file exceeds set size
    if(file.restaurantImage.size > maxSize){
      return({
        message: 'The file is too large'
      });
    }

    let ext = file.restaurantImage.name
    ext = ext.split('.').pop();
    ext = ext.toLowerCase();
    console.log(ext);

    //check for restrictions against decalred variable strings.
    if( !(ext == "png" || ext == "jpeg" || ext == "jpg" || ext =="gif")){
      return({
        message:  'Please upload an accepted image file type'
      })
    }

  }
}
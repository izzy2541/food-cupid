module.exports = {
    // [1] Form Config to Format Mixed Form Data
    prepareFormData(data, filePath){
      // New instance of class
      let formData = new FormData();
    
      // Append reconfigured mixed data to new object
      formData.append('avgRating', data.avgRating);
      formData.append('city', data.city);
      formData.append('cuisine', data.cuisine);
      formData.append('price', data.price);
      formData.append('restaurantImage', data.restaurantImage);
      formData.append('restaurantName', data.restaurantName);
      if (filePath) {
        formData.append('filePath', filePath);
      }
      
      // Return object
      return formData;
    },
  
    // [2] Create file name from URL in DB
    getFilePathFromUrl(downloadURL) {
      // Slice off the base URL from downloadURL
      const baseURL = `https://firebasestorage.googleapis.com/v0/b/foodie-bb739.appspot.com/o/`;
      let fileName = downloadURL.replace(baseURL, "");
      
      // Remove everything after the query string
      const indexOfEndPath = fileName.indexOf("?");
      fileName = fileName.substring(0, indexOfEndPath);
      
      // Return filepath to be deleted 
      console.log(`File Name: ${fileName}`);
      return fileName;
    }
  }
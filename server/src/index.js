const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const helmet = require("helmet");
var cors = require('cors');

//import custom modules
const ApiError = require('./utilities/ApiError');
const apiErrorHandler = require('./middleware/apiErrorHandler');

const config = require('./config/config')

//initialise app
const app = express();

//import central routes
const routes = require('./routes/routes');

//express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// file parsing middleware
app.use(fileUpload());

//cycle our requests through morgan 
app.use(morgan('dev'));

//main routing file
app.use('/api', routes());

//404 route
app.use((req, res, next) => {
  next(ApiError.notFound());
});

//express error handler 
app.use(apiErrorHandler);

//server port
const PORT = config.port;
app.listen(
    PORT,
    () => console.log(`Server is running on port: ${PORT}`));
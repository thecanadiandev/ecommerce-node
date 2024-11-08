require('dotenv').config();
// in controllers, we use trycatch. which is async 
// instead of adding them manually, below package helps with it.
require('express-async-errors');
const express = require('express');
const app = express();

const connectDB = require('./db/connect');

// middleware 
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// need access to the JSON data in the req.body
app.use(express.json());

app.get('/', (req, res) => {
  // http://localhost:5000/. 
  res.send('Server is running');
});

// use the middlewares
// 404 is palced first 
app.use(notFound);

// only if we throw an error from one of the handled routes, it hits the below handler 
app.use(errorHandlerMiddleware);


const start = async () => {
  const PORT = process.env.PORT || 5000;
  try {
   await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
   console.log('Server is running on port ' + PORT);
  });
 } catch (error) {
  console.log(error);
 }
};

start();
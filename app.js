require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// other packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


// DB 
const connectDB = require('./db/connect');

// Routers
const authRouter = require('./routes/authRoutes');

// middleware 
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

// ROUTES

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/v1', (req, res) => {
  console.log("COOKIE::", req.cookies);
  res.send('Server is running');
});

app.use('/api/v1/auth', authRouter);

app.use(notFound);
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
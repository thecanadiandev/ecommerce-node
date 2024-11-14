require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// other packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');


// DB 
const connectDB = require('./db/connect');

// Routers
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes')

// middleware 
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 60, // limit each IP to 60 requests per windowMs
  })
);
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cors());

app.use(morgan('tiny'));
app.use(express.json());
// Once we sign the cookie, its available in the signed cookies only 
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public')); // static files
app.use(cors());// we have to make the resources available to the front end if its not in the same domain.
app.use(fileUpload());

// ROUTES

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/api/v1', (req, res) => {
  // console.log("COOKIE::", req.cookies);
  console.log("COOKIE::", req.signedCookies);
  res.send('Server is running');
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter)

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
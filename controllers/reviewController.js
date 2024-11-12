const { StatusCodes } = require("http-status-codes");
const Review = require('../models/Review');
const Product = require('../models/Product');
const { CustomError } = require('../errors');
const { checkPermissions } = require('../utils');

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new CustomError.BadRequestError(`No product with id ${productId}`);
  }
  const alreadySubmitted = await Review.findOne({ user: req.user.userId, product: productId });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError('Already submitted review');
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
}

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
}

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {    
     throw new CustomError.NotFoundError(`No review with id, ${reviewId}`);
  }
  res.status(StatusCodes.OK).json({ review  });
}

const updateReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Update review' });
} 

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {    
     throw new CustomError.NotFoundError(`No review with id, ${reviewId}`);
  }
  checkPermissions(req.user, review.user);
  await review.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success, review removed' });
} 

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
const { StatusCodes } = require("http-status-codes");

const createReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Create review' });
}

const getAllReviews = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Get all reviews' });
}

const getSingleReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Get single review' });
}

const updateReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Update review' });
} 

const deleteReview = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: 'Delete review' });
} 

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
}
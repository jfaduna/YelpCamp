const express = require('express')
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware.js')
const reviews = require('../controllers/reviews.js')


router.get('/', reviews.index)

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router
const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, validateReview, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");



//Reviews
//post route
router.post("/reviews",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));


//destroy route
router.delete("/reviews/:reviewId", isLoggedIn,isReviewAuthor, reviewController.destroyReview);


// GET: Render Edit Form
router.get("/reviews/:reviewId/edit", isLoggedIn, isReviewAuthor, reviewController.renderEditReview);

// PUT/PATCH: Handle Review Update
router.put("/reviews/:reviewId", isLoggedIn, isReviewAuthor, reviewController.updateReview);

//for review page user_details
router.get("/", reviewController.isReviewOwner);



module.exports = router;

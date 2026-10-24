const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

// Post Route: Create Review
module.exports.createReview = async (req, res, next) => {
    try {
        let listing = await Listing.findById(req.params.id);
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();
        req.flash("success", "New Review Created!");
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        next(err); 
    }
};

// Destroy Route: Delete Review
module.exports.destroyReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    console.log("Review deleted");
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};

// Render Edit Review Page
module.exports.renderEditReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  const listing = await Listing.findById(id);

  if (!review || !listing) {
    req.flash("error", "Review or Listing not found!");
    return res.redirect(`/listings/${id}`);
  }

  res.render("reviews/edit.ejs", { listing, review });
};

// Update Review
module.exports.updateReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndUpdate(reviewId, { ...req.body.review });
  req.flash("success", "Review updated successfully!");
  res.redirect(`/listings/${id}`);
};


module.exports.isReviewOwner = async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate({
    path: "reviews",
    populate: { path: "author" } // Populates user details for each review
  });
  res.render("listings/show.ejs", { listing });
};
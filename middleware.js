const Review = require("./models/review.js");
const {reviewSchema} = require("./schema.js");
const {listingSchema} = require("./schema.js");

//Authentication route
module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

//validate Listing
module.exports.validateListing  = (req, res, next) =>{
    let { error } = listingSchema.validate(req.body);
     if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

//validate Review
module.exports.validateReview = (req, res, next) =>{
    let { error } = reviewSchema.validate(req.body);
     if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

//check review owner
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  
  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  // Check if the logged-in user owns the review
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
const Listing = require("../models/listing");
const Review = require("../models/review");

// =======================
// Create Review
// =======================
module.exports.createReview = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found.");
        return res.redirect("/listings");
    }

    const review = new Review(req.body.review);

    review.author = req.user._id;

    await review.save();

    listing.reviews.push(review);

    await listing.save();

    req.flash("success", "Review Added Successfully!");

    res.redirect(`/listings/${id}`);
};

// =======================
// Delete Review
// =======================
module.exports.destroyReview = async (req, res) => {

    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
        $pull: {
            reviews: reviewId,
        },
    });

    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted Successfully!");

    res.redirect(`/listings/${id}`);
};
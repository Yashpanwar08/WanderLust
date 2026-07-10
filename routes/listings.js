const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");

const { isLoggedIn, isOwner } = require("../middleware");

const listingController = require("../controllers/listings");
const upload = require("../config/multer");

// =====================
// Validation Middleware
// =====================
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const errMsg = error.details
            .map((el) => el.message)
            .join(", ");

        return next(new ExpressError(400, errMsg));
    }

    next();
};

// =====================
// Index
// =====================
router.get(
    "/",
    wrapAsync(listingController.index)
);

// =====================
// New Form
// =====================
router.get(
    "/new",
    isLoggedIn,
    listingController.renderNewForm
);

// =====================
// Create
// =====================
router.post(
    "/",
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createForm)
);

// =====================
// Show
// =====================
router.get(
    "/:id",
    wrapAsync(listingController.showListing)
);

// =====================
// Edit Form
// =====================
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.editForm)
);

// =====================
// Update
// =====================
router.put(
    "/:id",
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
);

// =====================
// Delete
// =====================
router.delete(
    "/:id",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
);

module.exports = router;
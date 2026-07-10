const Listing = require("../models/listing");
const cloudinary = require("../cloudConfig");
const streamifier = require("streamifier");

// =====================
// Index
// =====================
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
};

// =====================
// Render New Form
// =====================
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new");
};

// =====================
// Create Listing
// =====================
module.exports.createForm = async (req, res) => {

    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id;

    if (req.file) {

        const result = await new Promise((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "wanderlust_DEV",
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            streamifier
                .createReadStream(req.file.buffer)
                .pipe(uploadStream);
        });

        listing.image = {
            url: result.secure_url,
            filename: result.public_id,
        };
    }

    await listing.save();

    req.flash("success", "Listing Created Successfully!");
    res.redirect("/listings");
};

// =====================
// Show Listing
// =====================
module.exports.showListing = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("owner");

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    res.render("listings/show", { listing });
};

// =====================
// Edit Form
// =====================
module.exports.editForm = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listing.image?.url || "";

    if (originalImageUrl) {
        originalImageUrl = originalImageUrl.replace(
            "/upload",
            "/upload/w_300"
        );
    }

    res.render("listings/edit", {
        listing,
        originalImageUrl,
    });
};

// =====================
// Update Listing
// =====================
module.exports.updateListing = async (req, res) => {

    const { id } = req.params;

    const listing = await Listing.findByIdAndUpdate(
        id,
        req.body.listing,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (req.file) {

        const result = await new Promise((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "wanderlust_DEV",
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            streamifier
                .createReadStream(req.file.buffer)
                .pipe(uploadStream);
        });

        listing.image = {
            url: result.secure_url,
            filename: result.public_id,
        };

        await listing.save();
    }

    req.flash("success", "Listing Updated Successfully!");
    res.redirect(`/listings/${id}`);
};

// =====================
// Delete Listing
// =====================
module.exports.destroyListing = async (req, res) => {

    const { id } = req.params;

    await Listing.findByIdAndDelete(id);

    req.flash("success", "Listing Deleted Successfully!");

    res.redirect("/listings");
};
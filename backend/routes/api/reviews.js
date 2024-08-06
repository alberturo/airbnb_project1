const express = require("express");
const { requireAuth } = require("../../utils/auth");
const { Review, User, Spot, ReviewImage } = require("../../db/models");

const router = express.Router();

// Get all Reviews of the Current User
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;

  try {
    const reviews = await Review.findAll({
      where: { userId: user.id },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Spot,
          attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "price",
            "previewImage",
          ],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    });

    return res.status(200).json({
      Reviews: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      title: "Server Error",
      message: "An error occurred while retrieving data",
      error: error.message,
      stack: error.stack,
      sql: error.sql,
    });
  }
});

// Create and return a new image for a review specified by id.
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { url } = req.body;
  const userId = req.user.id; // Assuming `req.user` is populated by the authentication middleware

  if (!url) {
    return res.status(400).json({ message: "Image URL is required" });
  }

  try {
    // Check if the review exists and belongs to the current user
    const review = await Review.findOne({
      where: { id: reviewId, userId: userId },
    });

    if (!review) {
      return res.status(404).json({
        message:
          "Review couldn't be found or doesn't belong to the current user",
      });
    }

    // Check if there are already 10 images for this review
    const countImages = await ReviewImage.count({
      where: { reviewId: reviewId },
    });

    if (countImages >= 10) {
      return res.status(403).json({
        message: "Maximum number of images for this resource was reached",
      });
    }

    // Create the image
    const newImage = await ReviewImage.create({
      reviewId,
      url,
    });

    return res.status(201).json(newImage);
  } catch (error) {
    console.error("Error adding image to review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Edit a Review
router.put("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id;

  // Validate input
  if (!review || stars === undefined || stars < 1 || stars > 5) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        review: "Review text is required",
        stars: "Stars must be an integer from 1 to 5",
      },
    });
  }

  try {
    // Find the review and check ownership
    const foundReview = await Review.findOne({
      where: { id: reviewId, userId: userId },
    });

    if (!foundReview) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    // Update the review
    foundReview.review = review;
    foundReview.stars = stars;
    foundReview.updatedAt = new Date(); // Explicitly set if you want to control or show this in response

    await foundReview.save();

    return res.status(200).json(foundReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// delete a review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id; // Assuming `req.user` is populated by the authentication middleware

  try {
    // Find the review and verify ownership
    const review = await Review.findOne({
      where: {
        id: reviewId,
        userId: userId,
      },
    });

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    // Delete the review
    await review.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

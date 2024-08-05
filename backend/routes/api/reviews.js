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
            ["previewImage", "image url"],
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
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({
      title: "Server Error",
      message: "An error occurred while retrieving data",
      stack: err.stack, // Optionally include the stack trace for detailed debugging info
    });
  }
});

module.exports = router;

const express = require("express");
const { check, validationResult } = require("express-validator");
const {
  Spot,
  SpotImage,
  Review,
  User,
  ReviewImage,
} = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();
//Get all Spots
router.get("/", async (req, res) => {
  try {
    const spots = await Spot.findAll();
    res.status(200).json({ Spots: spots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//Get details of a Spot from an id
router.get("/current", requireAuth, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const spots = await Spot.findAll({ where: { ownerId: userId } });
    res.status(200).json({ Spots: spots });
  } catch (error) {
    next(err);
  }
});
//Get details of a Spot from an id
router.get("/:spotId", async (req, res) => {
  try {
    const { spotId } = req.params;
    const spotById = await Spot.findByPk(spotId);
    res.status(200).json(spotById);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// Create a Spot
const validateSpot = [
  check("address")
    .exists({ checkFalsy: true })
    .withMessage("Address is required"),
  check("city").exists({ checkFalsy: true }).withMessage("City is required"),
  check("state").exists({ checkFalsy: true }).withMessage("State is required"),
  check("country")
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude is invalid"),
  check("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude is invalid"),
  check("name").exists({ checkFalsy: true }).withMessage("Name is required"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
];

router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;
  const ownerId = req.user.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const newSpot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
    });

    return res.status(201).json(newSpot);
  } catch (err) {
    next(err);
  }
});

// Add an Image to a Spot based on the Spot's id
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  const userId = req.user.id;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ error: "Spot not found" });
    }

    // Check if the spot belongs to the current user
    if (spot.ownerId !== userId) {
      return res
        .status(403)
        .json({ error: "Forbidden: You do not own this spot" });
    }

    // Create the new image associated with the spot
    const newImage = await SpotImage.create({
      url,
      preview,
      spotId: spot.id,
    });

    return res.status(201).json({
      id: newImage.id,
      url: newImage.url,
      preview: newImage.preview,
    });
  } catch (err) {
    next(err);
  }
});

// Edit a Spot
router.put("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    if (spot.ownerId !== user.id) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    spot.address = address;
    spot.city = city;
    spot.state = state;
    spot.country = country;
    spot.lat = lat;
    spot.lng = lng;
    spot.name = name;
    spot.description = description;
    spot.price = price;

    await spot.save();

    return res.status(200).json(spot);
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Delete a Spot
router.delete("/:spotId", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    if (spot.ownerId !== user.id) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    await spot.destroy();

    return res.status(200).json({
      message: "Successfully deleted",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

// Get all reviews by a spot's id
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;

  try {
    // First, check if the spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({
        message: "Spot couldn't be found",
      });
    }

    // Fetch reviews for the spot
    const reviews = await Review.findAll({
      where: { spotId: spotId },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
    });

    res.status(200).json({ Reviews: reviews });
  } catch (error) {
    console.error("Error fetching reviews: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//Create a Review for a Spot based on the Spot's id
router.post("/:spotId/reviews", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { review, stars } = req.body;
  const userId = req.user.id; // Assuming req.user is set by your authentication middleware

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
    // Check if the spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    // Check for existing review by the same user
    const existingReview = await Review.findOne({
      where: { userId: userId, spotId: spotId },
    });

    if (existingReview) {
      return res
        .status(500)
        .json({ message: "User already has a review for this spot" });
    }

    // Create the review
    const newReview = await Review.create({
      userId,
      spotId,
      review,
      stars,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating the review:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

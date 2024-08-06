const express = require("express");
const { ReviewImage, Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const userId = req.user.id;

  try {
    const image = await ReviewImage.findByPk(imageId, {
      include: [
        {
          model: Review,
          required: true,
        },
      ],
    });

    if (!image) {
      return res
        .status(404)
        .json({ message: "Review Image couldn't be found" });
    }

    if (image.Review.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this review image" });
    }

    await image.destroy();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error deleting review image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

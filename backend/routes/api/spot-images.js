const express = require("express");
const { SpotImage, Spot } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const userId = req.user.id;

  try {
    const image = await SpotImage.findByPk(imageId, {
      include: [
        {
          model: Spot,
          required: true,
        },
      ],
    });

    if (!image) {
      return res.status(404).json({ message: "Spot Image couldn't be found" });
    }

    if (image.Spot.ownerId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this spot image" });
    }

    await image.destroy();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error deleting spot image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

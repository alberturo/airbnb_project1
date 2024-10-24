const express = require("express");
const { ReviewImage, Review } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const type = req.originalUrl.split("/")[2].includes("spot")
    ? "spot"
    : "review";
  const { imageId } = req.params;

  const image = await Image.findOne({
    where: {
      id: imageId,
      imageableType: type,
    },
    attributes: ["id", "imageableId", "imageableType"],
  });

  const notFoundError = checkIfExists(image, "Image");
  if (notFoundError) return next(notFoundError);

  let instance;

  if (type === "spot") {
    instance = await Spot.findByPk(image.imageableId, {
      attributes: ["id", "ownerId"],
    });
  } else {
    instance = await Review.findByPk(image.imageableId, {
      attributes: ["id", "userId"],
    });
  }
  const { id } = req.user;
  const authError = checkOwnership(instance, true, id);
  if (authError) return next(authError);

  await image.destroy();

  res.json({ message: "Successfully deleted" });
});

module.exports = router;

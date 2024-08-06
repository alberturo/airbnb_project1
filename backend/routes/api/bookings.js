const express = require("express");
const { Booking, Spot } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");

const router = express.Router();

router.get("/current", requireAuth, async (req, res) => {
  const userId = req.user.id;

  try {
    const bookings = await Booking.findAll({
      where: { userId: userId },
      include: [
        {
          model: Spot,
          as: "Spot",
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
      ],
      attributes: [
        "id",
        "spotId",
        "startDate",
        "endDate",
        "createdAt",
        "updatedAt",
      ],
    });
    const formattedBookings = bookings.map((booking) => ({
      id: booking.id,
      spotId: booking.spotId,
      Spot: {
        id: booking.Spot.id,
        ownerId: booking.Spot.ownerId,
        address: booking.Spot.address,
        city: booking.Spot.city,
        state: booking.Spot.state,
        country: booking.Spot.country,
        lat: booking.Spot.lat,
        lng: booking.Spot.lng,
        name: booking.Spot.name,
        price: booking.Spot.price,
        previewImage: booking.Spot.previewImage,
      },
      userId: booking.userId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    }));

    return res.status(200).json({ Bookings: formattedBookings });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

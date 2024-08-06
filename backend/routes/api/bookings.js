const express = require("express");
const { Booking, Spot } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

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
      userId: booking.userId, // check here
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

// Edit booking
router.put("/:bookingId", requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;
  const userId = req.user.id; // Assuming `req.user` is populated by the authentication middleware

  // Convert dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (!startDate || !endDate || start >= end || start < new Date()) {
    return res.status(400).json({
      message: "Bad Request",
      errors: {
        startDate: "startDate cannot be in the past",
        endDate: "endDate cannot be on or before startDate",
      },
    });
  }

  try {
    // Check if the booking exists and belongs to the user
    const booking = await Booking.findOne({
      where: {
        id: bookingId,
        userId: userId,
      },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    // Check if the booking is already past
    if (new Date(booking.endDate) < new Date()) {
      return res
        .status(403)
        .json({ message: "Past bookings can't be modified" });
    }

    // Check for booking conflicts
    const conflict = await Booking.findOne({
      where: {
        id: { [Op.ne]: bookingId },
        spotId: booking.spotId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [start, end],
            },
          },
          {
            endDate: {
              [Op.between]: [start, end],
            },
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: start } },
              { endDate: { [Op.gte]: end } },
            ],
          },
        ],
      },
    });

    if (conflict) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }

    // Update the booking
    booking.startDate = start;
    booking.endDate = end;
    await booking.save();

    return res.status(200).json(booking);
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete a booking
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user.id;

  try {
    const booking = await Booking.findOne({
      where: { id: bookingId },
      include: { model: Spot, attributes: ["ownerId"] },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    // Check if the booking belongs to the user or if the user owns the spot
    if (booking.userId !== userId && booking.Spot.ownerId !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this booking" });
    }

    // // Check if the booking has already started
    // if (new Date(booking.startDate) <= new Date()) {
    //     return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
    // }

    // Delete the booking
    await booking.destroy();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;

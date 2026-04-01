const express = require("express");
const router = express.Router();

const hotel = require("../models/hotelModel");

router.get("/rooms", (req, res) => {
  res.json(hotel.getRooms());
});

router.post("/book", (req, res) => {
  const { count } = req.body;
  const result = hotel.bookRooms(Number(count));
  res.json(result);
});

router.post("/reset", (req, res) => {
  hotel.resetRooms();
  res.json({ success: true });
});

router.post("/random", (req, res) => {
  hotel.randomOccupancy();
  res.json({ success: true });
});

module.exports = router;
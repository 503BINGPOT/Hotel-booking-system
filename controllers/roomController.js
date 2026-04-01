const hotel = require("../models/hotelModel");

exports.getRooms = (req, res) => {
  res.json(hotel.getRooms());
};
const router = require('express').Router();
const {addParkingSpot, getAllParkingSpots, getParkingSpotById, getParkingSpot, updateParkingSpot, deleteParkingSpot} = require('../controllers/parkingSpot');

const parkingSpot = require('../models/parkingSpot');

// add a new parkingspot
router.post("/add", addParkingSpot)
// get all the available parkingspots
router.get("/getAll", getAllParkingSpots)

// get a parkingspot based on parkingspot id
router.param("parkingSpotId", getParkingSpotById);
router.get("/:parkingSpotId",getParkingSpot);

// update a parkingspot based on parkingspot id
router.put("/:parkingSpotId", updateParkingSpot)

// delete a parkingspot based on parkingspot id in body
router.delete("/delete", deleteParkingSpot)

// get all the parkingspots based on owner id
// Work In Progress

module.exports = router;
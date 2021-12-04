const router = require('express').Router();
const {addParkingSpot, getAllParkingSpots, getParkingSpotById, getParkingSpot, updateParkingSpot, deleteParkingSpot, getAllParkingSpotsOfOwner} = require('../controllers/parkingSpot');

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
router.delete("/delete/:parkingSpotId", deleteParkingSpot)

// get all the parkingspots based on userId
router.post("/spots", getAllParkingSpotsOfOwner);

// get all the parkingspots based on nearest location from the given longitudes and latitudes
//router.post("/findNearest", getNearestParkingSpots);


module.exports = router;
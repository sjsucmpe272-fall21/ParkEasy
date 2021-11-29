var userController = require('../controllers/userController');
var express = require('express');
var router = express.Router();

router.post("/register", userController.registerUser);
router.post("/booking", userController.addBooking);
router.put("/booking/status", userController.updateBookingStatus);

module.exports = router;
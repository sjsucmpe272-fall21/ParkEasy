var userController = require('../controllers/userController');
var express = require('express');
var router = express.Router();

router.post("/register", userController.registerUser);

module.exports = router;
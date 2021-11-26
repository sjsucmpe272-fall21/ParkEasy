var userController = require('../controllers/userController');
var express = require('express');
var router = express.Router();


router.post('/login', userController.userLogin);

module.exports = router;

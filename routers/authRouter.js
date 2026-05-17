const express = require('express')
const controller = require('../controllers/authController');

const router = express.Router();

router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
router.post('/signout', controller.signout);

// Accept POST from client and call the correct exported handler
router.post('/SendVerificationCode', controller.sendVerificationcode);


module.exports = router;
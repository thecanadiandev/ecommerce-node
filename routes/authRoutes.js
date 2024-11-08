const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');

// ADD POSTMAN COLLECTION FOR ALL THESE 

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
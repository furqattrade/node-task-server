const express = require('express');
const router = express.Router();
const {register,login, getUser} = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');

router.route("/").get(verifyToken,getUser)
router.route("/register").post(register)
router.route('/login').post(login);

module.exports = router;

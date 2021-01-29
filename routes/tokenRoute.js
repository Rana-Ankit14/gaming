const express = require("express");
const router = express.Router();

const tokenController = require('../controllers/tokenController')
const middleware = require('./middleware')


router
    .route('/validate')
    .post(middleware.authenticateToken,tokenController.validate);



module.exports = router;

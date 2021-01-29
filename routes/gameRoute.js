const express = require("express");
const router = express.Router();

const gameController = require('../controllers/gameController')
const middleware = require('./middleware')


router
    .route('/saveResult')
    .post(middleware.authenticateToken,gameController.saveResult);
router
    .route('/gameResult')
    .post(middleware.authenticateToken,gameController.gameResultDetail);
router
    .route('/countDailyGame')
    .post(middleware.authenticateToken,gameController.countDailyGame);


module.exports = router;

const express = require("express");
const router = express.Router();

const userRoutes = require('./userRoute');
const gameRoutes = require('./gameRoute')
const tokenRoutes = require('./tokenRoute')


router.use("/user", userRoutes);
router.use("/game", gameRoutes);
router.use("/token", tokenRoutes);


module.exports = router;

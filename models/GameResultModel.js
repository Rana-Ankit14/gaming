const mongoose = require('mongoose');


const GameResultSchema = new mongoose.Schema({
        resultID: {type: Number, default: 0, required: true, index: true},
        userID: {type: Number, default: 0, required: true},
        points: {type: Number, default: 0},
        createdDate: {type: Date, default: Date.now()},
    });

GameResultSchema.virtual('user_details', {ref: 'User', localField: 'userID', foreignField: 'userID'})

module.exports = mongoose.model('GameResult', GameResultSchema)

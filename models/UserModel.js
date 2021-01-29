const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    userID: { type: Number, default: 0, required: true, index: true},
    email: {type: String,default: ''},
    name: {type: String,default: ''},
    password: {type: String,default: ''},
    createdDate: {type: Date,default: Date.now()},
});

module.exports = mongoose.model('User',UserSchema)

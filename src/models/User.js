const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        min: [10, 'Email must be minimum 10 characters long!'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password must be minimum 4 characters long!'],
    },
    createdStone: [{
        type: mongoose.Types.ObjectId,
        ref: 'Stone',
    }],
    likedStones: [{
        type: mongoose.Types.ObjectId,
        ref: 'Stone',
    }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
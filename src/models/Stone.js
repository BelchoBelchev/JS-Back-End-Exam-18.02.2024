const mongoose = require('mongoose');

const stoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        min: [2, 'Name must be minimum 2 characters long!'],
    },
    category: {
        type: String,
        required: [true, 'Category is required!'],
        min: [3, 'Category must be minimum 3 characters long!'],
    },
    color: {
        type: String,
        required: [true, 'Color is required!'],
        min: [2, 'Color must be minimum 2 characters long!'],
    },
    image: {
        type: String,
        required: [true, 'Image is required!'],
        match: /^https?:\/\//,
    },
    location: {
        type: String,
        required: [true, 'Location is required!'],
        min: [5, 'Location must be minimum 5 characters long!'],
        max: [15, 'Location must be minimum 15 characters long!'],
    },
    formula: {
        type: String,
        required: [true, 'Formula is required!'],
        min: [3, 'Formula must be minimum 3 characters long!'],
        max: [30, 'Formula must be minimum 30 characters long!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        min: [10, 'Description must be minimum 10 characters long!'],
    },
    likedList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    createdAt: Date,
});

stoneSchema.pre('save', function () {
    if (!this.createdAt) {
        this.createdAt = Date.now();
    }
});

const Stone = mongoose.model('Stone', stoneSchema);
module.exports = Stone;
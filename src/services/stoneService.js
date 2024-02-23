const Stone = require('../models/Stone');
const User = require('../models/User');

exports.getLastThree = () => {
    const last3 = Stone.find().sort({ createdAt: -1 }).limit(3);
    return last3;
};

exports.create = async (userId, stoneData) => {
    const stone = await Stone.create({
        owner: userId,
        ...stoneData,
    });

    await User.findByIdAndUpdate(userId, { $push: { createdStone: stone._id } });

    return stone;
};

exports.getAll = () => {
    const stones = Stone.find();
    return stones;
};

exports.getOne = (id) => {
    const stone = Stone.findById(id)
        .populate('owner')
        .populate('likedList');
    return stone;
};

exports.like = async (id, userId) => {
    const stone = await Stone.findById(id);
    const user = await User.findById(userId)

    stone.likedList.push(userId);
    user.likedStones.push(id);

    await stone.save();
    await user.save();
};

exports.search = (name) => {
    let query = Stone.find();

    if (name) {
        query = query.find({ name: new RegExp(name, 'i') });
    }

    return query;
};
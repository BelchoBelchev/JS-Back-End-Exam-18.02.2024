const Stone = require('../models/Stone');

exports.isGuest = (req, res, next) => {
    if (!req.user) {
        next();
    } else {
        res.redirect('/');
    }
};

exports.isCreator = async (req, res, next) => {
    const stone = await Stone.findById(req.params.id).lean();
    const isCreator = stone.owner == req.user?._id;

    if (!isCreator) {
        res.redirect('/');
        return;
    }
    next();
};
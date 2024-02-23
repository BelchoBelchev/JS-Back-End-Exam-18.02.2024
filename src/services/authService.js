const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../config/config');

exports.register = async (userData) => {
    if (!userData.email) {
        throw new Error('Email is required!');
    }

    if (!userData.password) {
        throw new Error('Password is required!');
    }

    if (userData.password !== userData.rePassword) {
        throw new Error('Password and Re-password must match!');
    }

    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error('User already exists!');
    }

    const hash = await bcrypt.hash(userData.password, 12);
    userData.password = hash;

    return User.create(userData);
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Cannot find username or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Cannot find username or password!');
    }

    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: '1h' });

    return token;
};
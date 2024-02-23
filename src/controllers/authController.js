const router = require('express').Router();
const bcrypt = require('bcrypt');

const authService = require('../services/authService');
const { errorMessage } = require('../utils/errorHandling');
const { isGuest } = require('../middlewares/userMiddleware');

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        await authService.register(userData);
        res.redirect('/');
    } catch (err) {
        res.render('register', { error: errorMessage(err), userData });
    }
});

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {

    const { email, password } = req.body;

    try {

        const token = await authService.login(email, password);

        res.cookie('auth', token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        res.render('login', { email, error: errorMessage(err) })
    }

});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = router;
const router = require('express').Router();

const { isAuth } = require('../middlewares/authMiddleware');
const stoneService = require('../services/stoneService');
const { errorMessage } = require('../utils/errorHandling');

router.get('/createStone', isAuth, (req, res) => {
    res.render('create');
});

router.post('/createStone', isAuth, async (req, res) => {
    const stone = req.body;

    try {
        await stoneService.create(req.user._id, stone);
        res.redirect('/dashboard');
    } catch (err) {
        res.render('create', { error: errorMessage(err), stone });
    }
});

module.exports = router;
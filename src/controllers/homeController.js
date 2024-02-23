const router = require('express').Router();

const stoneService = require('../services/stoneService');
const { errorMessage } = require('../utils/errorHandling');

router.get('/', async (req, res) => {

    const last3 = await stoneService.getLastThree().lean();

    try {
        res.render('home', { last3 });
    } catch (err) {
        res.render('home', { error: errorMessage(err) });
    }
});

router.get('/404', (req, res) => {
    res.render('404');
});

module.exports = router;
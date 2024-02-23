const router = require('express').Router();

const stoneService = require('../services/stoneService');
const { errorMessage } = require('../utils/errorHandling');

router.get('/dashboard', async (req, res) => {
    const stones = await stoneService.getAll().lean();

    try {

        res.render('dashboard', { stones });

    } catch (err) {
        res.render('dashboard', { error: errorMessage(err) })
    }
});

module.exports = router;
const router = require('express').Router();

const stoneService = require('../services/stoneService');
const { auth } = require('../middlewares/authMiddleware');
const { errorMessage } = require('../utils/errorHandling');

router.get('/search', auth, async (req, res) => {

    const { name } = req.query;
    
    try {
        const stone = await stoneService.search(name,).lean();
        res.render('search', { stone, name });
    } catch (err) {
        res.render('search', { error: errorMessage(err) });
    }
});

module.exports = router;
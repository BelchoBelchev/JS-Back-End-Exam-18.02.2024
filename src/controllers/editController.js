const router = require('express').Router();

const Stone = require('../models/Stone');

const stoneService = require('../services/stoneService');
const { isCreator } = require('../middlewares/userMiddleware');
const { errorMessage } = require('../utils/errorHandling');

router.get('/edit/:id', isCreator, async (req, res) => {
    const stone = await stoneService.getOne(req.params.id).lean();

    try {
        res.render('edit', { stone });
    } catch (err) {
        res.render('edit', { error: errorMessage(err) });
    }
});

router.post('/edit/:id', isCreator, async (req, res) => {
    const stone = req.body;

    try {
        await Stone.findByIdAndUpdate(req.params.id, stone, { runValidators: true });
        res.redirect(`/details/${req.params.id}`);

    } catch (err) {
        res.render('edit', { error: errorMessage(err), stone });
    }
});

router.get('/delete/:id', isCreator, async (req, res) => {

    try {
        await Stone.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard');

    } catch (err) {
        res.redirect('/');
    }
});

module.exports = router;
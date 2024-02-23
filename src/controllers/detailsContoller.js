const router = require('express').Router();

const stoneService = require('../services/stoneService');
const { auth } = require('../middlewares/authMiddleware');
const { errorMessage } = require('../utils/errorHandling');

router.get('/details/:id', auth, async (req, res) => {

    const stone = await stoneService.getOne(req.params.id).lean();
    const isOwner = stone.owner._id == req.user?._id;
    const isLiked = stone.likedList.some(user => user._id == req.user?._id);

    try {
        res.render('details', { stone, isOwner, isLiked });
    } catch (err) {
        res.render('details', { error: errorMessage(err) });
    }
});

router.get('/details/:id/like', auth, async (req, res) => {
    await stoneService.like(req.params.id, req.user._id);
    res.redirect(`/details/${req.params.id}`);
});

module.exports = router;
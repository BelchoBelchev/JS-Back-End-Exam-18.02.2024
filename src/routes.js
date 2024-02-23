const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const createStoneController = require('./controllers/createStoneController');
const dashboardController = require('./controllers/dashboardController');
const detailsContoller = require('./controllers/detailsContoller');
const editController = require('./controllers/editController');
const searchController = require('./controllers/searchController');

router.use(homeController);
router.use(authController);
router.use(createStoneController);
router.use(dashboardController);
router.use(detailsContoller);
router.use(editController);
router.use(searchController);

router.get('*', (req, res) => {
    res.redirect('/404');
});

module.exports = router;
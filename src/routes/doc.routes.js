const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).render('pages/index');
});

router.get('/about', (req, res) => {
    res.status(200).render('pages/about');
});


module.exports = router;
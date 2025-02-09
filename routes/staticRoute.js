const router = require('express').Router();
const url = require("../models/url");



router.get('/signup', async (req, res) => {
    res.render("signup");
});

router.get('/signin', async (req, res) => {
    res.render("signin");
});

router.get('/', async (req, res) => {
    const urls = await url.find({});
    res.render("home",{
        urls : urls,
    });
});




module.exports = router;
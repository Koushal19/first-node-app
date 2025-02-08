const router = require('express').Router();
const URL = require("../models/url");


router.get('/', async (req, res) => {
    const urls = await URL.find({});
    res.render("home",{
        urls : urls,
    });
});

module.exports = router;
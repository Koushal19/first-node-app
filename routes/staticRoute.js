const router = require('express').Router();
const url = require("../models/url");
const {restrictToRole} = require("../middlewares/auth");



router.get('/signup', async (req, res) => {
    res.render("signup");
});

router.get('/signin', async (req, res) => {
    res.render("signin");
});

router.get('/', restrictToRole(["NORMAL"]),async (req, res) => {
    const urls = await url.find({});
    res.render("home",{
        urls : urls,
    });
});




module.exports = router;
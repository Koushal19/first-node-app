const router = require('express').Router();
const {handleGenerateShortUrl,handleGetAnalytics} = require("../controllers/url")

router.post('/',handleGenerateShortUrl);

router.get('/analytics/:shortid',handleGetAnalytics);

module.exports = router;
const shortid = require('shortid');
const url = require("../models/url");

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if (!body.url){
        return res.status(400).json({error: "bad request, url is required"});
    }
    const shortId = shortid();
    await url.create({
        ShortID : shortId,
        redirectURL : body.url,
        visitHistory :[],
    });
    return res.render("home",{
        shortid : shortId,
    });
  
   
}

async function handleGetAnalytics(req,res){
    const id = req.params.shortid;
    const result = await url.findOne({ShortID : id})

    return res.json({totalClicks : result.visitHistory.length , analytics: result.visitHistory});
    

}

module.exports = { 
    handleGenerateShortUrl,
    handleGetAnalytics
} 
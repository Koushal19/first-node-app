const express = require('express');
const urlRoute = require("./routes/url")
const URL = require("./models/url");
const {connectToMongooseDB}= require("./connect");
const app = express();
const port = 3000;

app.use(express.json());

connectToMongooseDB('mongodb://127.0.0.1:27017/url-shortner')
.then(()=> console.log("mongo db connected"));

app.use('/url', urlRoute);

app.get('/:shortid', async (req, res)=>{
    const shortId = req.params.shortid;

    const entry = await URL.findOneAndUpdate({
        ShortID : shortId
    },{
        $push :{
            visitHistory:{
                timestamps : Date.now()
            }
        } 
    });
    return res.redirect(entry.redirectURL);
})

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
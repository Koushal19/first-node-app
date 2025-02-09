const express = require('express');
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRoute");
const cookieParser = require('cookie-parser');
const path = require('path');
const URL = require("./models/url");
const {connectToMongooseDB}= require("./connect");
const {checkForAuth, restrictToRole} = require("./middlewares/auth");
const app = express();
const port = 3000;


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuth);

connectToMongooseDB('mongodb://127.0.0.1:27017/url-shortner')
.then(()=> console.log("mongo db connected"));

app.use('/url', restrictToRole(["NORMAL"]), urlRoute);
app.use('/user', userRoute);
app.use('/', staticRoute);



app.get('/url/:shortid', async (req, res)=>{
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
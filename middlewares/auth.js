const {getUserFromSessionId} = require("../service/auth");

async function restrictTologgedInUserOnly(req, res, next) {
    const userUID = req.cookies.uid; 

    if (!userUID) {
        return res.redirect("/signin");
    }  
    
    const user = getUserFromSessionId(userUID);

    if (!user) {
        return res.redirect("/signin");
    }

    req.user = user;
    next();

} 

module.exports = {restrictTologgedInUserOnly};
const {getUserFromSessionId} = require("../service/auth");





function checkForAuth(req,res,next){
    const tokenCookie = req.cookies.uid;
    req.user = null;
    if(!tokenCookie || !tokenCookie.length) return next();    



    const user = getUserFromSessionId(tokenCookie);

    if(!user){
        return next();
    }
    req.user = user;
    next();
    
}

function restrictToRole(roles=[]) {
    return (req, res, next) => {        
        if (!req.user){
            return res.status(401).redirect("/signin");
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).end("Unauthorized");
        }

        return next();
    };

}



module.exports = {checkForAuth,
    restrictToRole,
};
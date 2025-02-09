const jwt = require("jsonwebtoken");
const secret = "hello$1234@5678"


function setUserForSessionId(user) {
    return jwt.sign(
        {
            email: user.email,
            _id : user._id,
            role : user.role
        },secret);
    
}

function getUserFromSessionId(token) {
    if(!token) return null; 
    try{
        return jwt.verify(token,secret);
    } catch{
        return null;
    }
}


module.exports = {
    setUserForSessionId,
    getUserFromSessionId
}

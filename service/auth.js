const sessionIdToUserMap = new Map();


function setUserForSessionId(sessionId, user) {
    return sessionIdToUserMap.set(sessionId, user);
}

function getUserFromSessionId(sessionId) {
    return sessionIdToUserMap.get(sessionId);
}


module.exports = {
    setUserForSessionId,
    getUserFromSessionId
}

const sessionidtomap = new Map();

function setUser(id, user){
    sessionidtomap.set(id, user);
    return;
}

function getUser(id){
    return sessionidtomap.get(id);
}

module.exports = {
    setUser,
    getUser
}
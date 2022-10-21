//Manages chat users here

const users = [];

//Join/add user to chat
function userJoin(id, username, room) {
    //add a user to a chat room

    const user = {id, username, room}

    //add user to the users list
    users.push(user);

}
//get current user
function getCurrentUser(id) {
    //get a user using his id

    return users.find(user => user.id === id);

}

module.exports = {userJoin, getCurrentUser};

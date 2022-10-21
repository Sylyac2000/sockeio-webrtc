const moment = require('moment');
function formatMessage(username, msgtext){
    return {
        username,
        msgtext,
        time: moment().format('h:mm:ss a')
    }
}

module.exports = formatMessage;
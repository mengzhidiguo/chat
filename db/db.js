
var mysql      = require('mysql');
var connection = mysql.createConnection(require('../config.js').mysql);



//module.exports = connection.query;

module.exports = function(){
    if(!connection)
        connection = mysql.createConnection(require('../config.js').mysql);
    return connection;
};

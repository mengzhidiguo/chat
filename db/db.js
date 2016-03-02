
var mysql      = require('mysql');
var con = mysql.createConnection(require('../config.js').mysql);



//module.exports = connection.query;

module.exports = function(){
    if(!con)
        con = mysql.createConnection(require('../config.js').mysql);
    return con;
};

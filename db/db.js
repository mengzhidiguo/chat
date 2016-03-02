
var mysql      = require('mysql');
var connection = mysql.createConnection(require('../config.js').mysql);





module.exports = function query(sql,callback){
    connection.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        if (rows.length > 0) {
            //var author = rows[0].author, date = rows[0].time, times = rows[0].hit, title = rows[0].title;
            callback(rows);
        }
    });
};

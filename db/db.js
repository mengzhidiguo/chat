
var mysql      = require('mysql');
var connection = mysql.createConnection(require('../config.js').mysql);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

});



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

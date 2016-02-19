var express = require('express')
var app = express()
app.use(express.static('./'));
app.get('/', function (req, res) {
  res.sendFile('index.html');
})

app.listen(process.env.PORT || 5050)

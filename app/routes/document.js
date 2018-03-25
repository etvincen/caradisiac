var express = require('express'); 
var elastic = require('C:\\Users\\etien\\Documents\\GitHub\\caradisiac\\elastic');
var bodyParser = require('body-parser');

var app = express();
const port = 9292; //Run on cmd : "elasticsearch -E http.port=9292" to make the server listening on this port

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log('We are live on ' + port);
});

/* GET SUV */
app.get('/suv', function (req, res, next) {  
  
});

/* Index */
app.post('/populate', function (req, res, next) {  
  elastic.addDocument(req.body).then(function (result) { res.json(result) });
});

module.exports = app;
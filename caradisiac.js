const elasticsearch  = require('elasticsearch')
const express        = require('express');
const bodyParser     = require('body-parser');
//const index          = require('./app/routes/index')
//const db             = require('./config/db');


const {getModels} = require('node-car-api');

async function print () {
  const models = await getModels('PEUGEOT');

  console.log(models);
}

const port = 9292;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var client = new elasticsearch.Client({
  host: 'localhost:9292',
  apiVersion : "6.2",
  log: 'trace'
});

client.ping({ 
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log(print());
  }
});

//client.bulk('./app/routes/index',)

/*MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  // Make sure you add the database name and not the collection name
  db = database.db("note-api");
  require('./app/routes')(app, db);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})*/


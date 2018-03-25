const elasticsearch  = require('elasticsearch')
const {getModels} = require('node-car-api');
const {getBrands} = require('node-car-api');
const fs = require('fs');
var express = require('express');
var documents = require('./app/routes/document');

const router = express.Router();
const app = express();
var tmp = [];
var indexName = "cars";


//*********************************
//Get Audi's models and save it to Json file
async function models (mod) {
  const models = await getModels(mod);
  return models;
}

async function brands () {
  const brands = await getBrands();
  return brands;
}

var get_Mods = async function(){
  var response = await brands()
  tmp = response
  response = await models(tmp[7])
  return response
}

get_Mods().then(function(posts){
  console.log(posts)
  contentForFile = JSON.stringify(posts)
  fs.appendFileSync('./cars.json', '');
  fs.writeFileSync('./cars.json', contentForFile, "utf-8");
}).catch(function(error){
  console.log(error)
})
//*******************

var elastic = require('./elastic');

elastic.indexExists().then(function (exists) {  
  if (exists) { 
    return elastic.deleteIndex(); 
  } 
}).then(function () {
  return elastic.initIndex().then(elastic.initMapping).then(function () {
    var audi_cars = fs.readFileSync("./cars.json");
    var promises = [JSON.parse(audi_cars)].map(function (models) {
      return elastic.addDocument({
        brand: models.brand,
        model: models.model,
        volume : models.volume,
        uuid : models.uuid,
        name: models.name,
        metadata: {
          ModelLength: models.length
        }
      });
    });
    return Promise.all(promises);
  });
});



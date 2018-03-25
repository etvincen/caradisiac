var elasticsearch = require('elasticsearch');

var elasticClient = new elasticsearch.Client({  
    host: 'localhost:9292',
    log: 'info'
});

var indexName = "cars";

/**
* Delete an existing index
*/
function deleteIndex() {  
    return elasticClient.indices.delete({
        index: indexName
    });
}
exports.deleteIndex = deleteIndex;

/**
* create the index
*/
function initIndex() {  
    return elasticClient.indices.create({
        index: indexName
    });
}
exports.initIndex = initIndex;

/**
* check if the index exists
*/
function indexExists() {  
    return elasticClient.indices.exists({
        index: indexName
    });
}
exports.indexExists = indexExists;

function initMapping() {  
    return elasticClient.indices.putMapping({
        index: indexName,
        type: "document",
        body: {
            properties: {
                brand: { type: "text" },
                model: { type: "text" },
                volume: { type: "text" },
                uuid: { type: "text" },
                name: { type: "text" },
                suggest: {
                    type: "completion",
                    analyzer: "simple",
                    search_analyzer: "simple"
                }
            }
        }
    });
}
exports.initMapping = initMapping;

function addDocument(document) {  
    return elasticClient.index({
        index: indexName,
        type: "document",
        body: {
            brand: document.brand,
            model: document.model,
            volume : document.volume,
            uuid : document.uuid,
            name : document.name,
            suggest: {
                input: document.model,
                output: document.volume,
            }
        }
    });
}
exports.addDocument = addDocument;

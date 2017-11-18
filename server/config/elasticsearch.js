var elasticsearch=require('elasticsearch');

var client;

if (process.env.DEV) {
    client = new elasticsearch.Client( {  
        hosts: [
          'localhost:9200'
        ]
    });
  } else {
    client = new elasticsearch.Client( {  
        hosts: [
          '172.30.0.17:9200'
        ]
    });
  }




module.exports = client;
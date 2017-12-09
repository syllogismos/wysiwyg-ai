var elasticsearch=require('elasticsearch');

var client;

if (process.env.ESCHERNODE_ENV == 'dev') {
    client = new elasticsearch.Client( {  
        hosts: [
          '52.54.220.35:9200'
        ]
    });
  } else if (process.env.ESCHERNODE_ENV == 'prod') {
    client = new elasticsearch.Client( {  
        hosts: [
          '172.30.0.17:9200'
        ]
    });
  }




module.exports = client;
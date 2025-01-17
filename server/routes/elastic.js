const express = require('express')
const router = express.Router()
const request = require('request')
const es = require('../config/elasticsearch')

router.post('/posttest', (req, res) => {
  console.log(req.body);
  return res.json({ message: 'success' })
})

router.post('/getSystemStats', (req, res) => {
  es.search({
    index: 'metricbeat*',
    body: {
      "query": {
        "bool": {
          "filter": [
            {
              "term": {
                "fields.experiment": req.body.exp_id
              }
            }
          ]
        }
      },
      "size": 10000
    }
  }).then(function (resp) {
    return res.json({ message: 'success', body: resp.hits })
  }, function (error) {
    console.log(error)
    return res.json({ message: 'failure' })
  })
})

router.post('/getRLExpLogs', (req, res) => {
  console.log(req.body);
  console.log(req.user);
  es.search({
    index: 'filebeat*',
    body: {
      "query": {
        "bool": {
          "filter": [
            {
              "term": {
                "json.event": "rl_log"
              }
            },
            {
              "term": {
                "json.exp": req.body.exp_id
              }
            }
          ]
        }
      },
      "size": 10000
    }
  }).then(function (resp) {
    console.log(resp.hits.total)
    return res.json({ message: 'success', body: resp.hits })
  }, function (error) {
    console.log(error)
    return res.json({ message: 'failure' })
  })
  // return res.json({message: 'success'})
})

router.post('/getSupExpLogs', (req, res) => {
  console.log(req.body)
  console.log(req.user);
  es.search({
    index: 'filebeat*',
    body: {
      "query": {
        "bool": {
          "filter": {
            "term": { "json.exp": req.body.exp_id }
          },
          "should": [
            { "term": { "json.event": "train_log" } },
            { "term": { "json.event": "val_log" } }
          ],
          "minimum_should_match": 1
        }
      },
      "size": 10000
    }
  }).then(function (resp) {
    console.log(resp.hits.total)
    return res.json({ message: 'success', body: resp.hits })
  }, function (error) {
    console.log(error)
    return res.json({ message: 'failure' })
  })
})


router.post('/getExperimentTimeline', (req, res) => {
  es.search({
    index: 'filebeat*',
    body: {
      "query": {
        "bool": {
          "filter": [
            {
              "term": {
                "json.event": "exp_timeline"
              }
            },
            {
              "term": {
                "json.exp": req.body.exp_id
              }
            }
          ]
        }
      },
      "size": 100
    }
  }).then(function (resp) {
    console.log(resp.hits.total)
    return res.json({ message: 'success', body: resp.hits })
  }, function (error) {
    console.log(error)
    return res.json({ message: 'failure' })
  })
})

module.exports = router;

/**

client.search({
  index: 'filebeat*',
  body: {
	query: {
	  match: {
		'json.exp': '5a0c79a52a479337b2e67385'
	  }
	}
  }
}).then(function (resp) {
	var hits = resp.hits.total;
	console.log(hits)
}, function (err) {
	console.trace(err.message);
});

 */
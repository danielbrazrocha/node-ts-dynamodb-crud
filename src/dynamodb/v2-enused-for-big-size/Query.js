const AWS = require('aws-sdk')

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
})

const docClient = new AWS.DynamoDB.DocumentClient()

console.log('Querying for IPA Beers.')

const params = {
  TableName: 'Beers',
  KeyConditionExpression: '#type = :type',
  ExpressionAttributeNames: {
    '#type': 'type',
  },
  ExpressionAttributeValues: {
    ':type': 'IPA',
  },
}

docClient.query(params, function (err, data) {
  if (err) {
    console.error('Unable to query. Error:', JSON.stringify(err, null, 2))
  } else {
    console.log('Query succeeded.')
    data.Items.forEach(function (item) {
      console.log(
        ' -',
        item.type + ': ' + item.name + ' ' + item.info.abv + '%',
      )
    })
  }
})

const AWS = require('aws-sdk')

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
})

const docClient = new AWS.DynamoDB.DocumentClient()

const table = 'Cars'

const id = 1

const params = {
  TableName: table,
  Key: {
    id,
  },
}

docClient.get(params, function (err, data) {
  if (err) {
    console.error(
      'Unable to read item. Error JSON:',
      JSON.stringify(err, null, 2),
    )
  } else {
    console.log('GetItem succeeded:', JSON.stringify(data, null, 2))
  }
})

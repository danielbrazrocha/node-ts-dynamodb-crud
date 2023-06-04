const AWS = require('aws-sdk')

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
})

const dynamodb = new AWS.DynamoDB()

const params = {
  TableName: 'Cars',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
  ],
  AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
}

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      'Unable to create table. Error JSON:',
      JSON.stringify(err, null, 2),
    )
  } else {
    console.log(
      'Created table. Table description JSON:',
      JSON.stringify(data, null, 2),
    )
  }
})

const AWS = require('aws-sdk')
const fs = require('fs')

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
})

const docClient = new AWS.DynamoDB.DocumentClient()

console.log('Importing Beers into DynamoDB. Please wait.')

const allBeers = JSON.parse(fs.readFileSync('IPA.json', 'utf8'))

allBeers.forEach(function (beer) {
  console.log(beer)

  const params = {
    TableName: 'Beers',
    Item: {
      type: beer.type,
      name: beer.name,
      info: beer.info,
    },
  }

  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        'Unable to add Beer',
        beer.name,
        '. Error JSON:',
        JSON.stringify(err, null, 2),
      )
    } else {
      console.log('PutItem succeeded:', beer.name)
    }
  })
})

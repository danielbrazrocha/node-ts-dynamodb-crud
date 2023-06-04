const AWS = require('aws-sdk')
const fs = require('fs')

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
})

const docClient = new AWS.DynamoDB.DocumentClient()

console.log('Importing Cars into DynamoDB. Please wait.')

const cars = JSON.parse(fs.readFileSync('carData.json', 'utf8'))

cars.forEach(function (car) {
  console.log(car)

  const params = {
    TableName: 'Cars',
    Item: {
      id: car.id,
      type: car.type,
      name: car.name,
      manufacturer: car.manufacturer,
      fuel_type: car.fuel_type,
      description: car.description,
    },
  }

  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        'Unable to add Car',
        car.name,
        '. Error JSON:',
        JSON.stringify(err, null, 2),
      )
    } else {
      console.log('PutItem succeeded:', car.name)
    }
  })
})

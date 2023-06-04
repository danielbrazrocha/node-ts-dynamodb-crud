import fs from 'fs'
import { client } from '@app/lib/dynamoClient'
import { PutItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'

console.log('Importing mail data into DynamoDB. Please wait.')

const mailData = JSON.parse(fs.readFileSync('mailData.json', 'utf8'))

mailData.forEach((mail) => {
  const dateAtNow = new Date().toISOString()

  const item = {
    PK: mail.PK,
    SK: mail.SK,
    Product: mail.Product,
    Decision: mail.Decision,
    Inspector: {
      id: mail.Inspector.id,
      Name: mail.Inspector.Name,
    },
    CreatedAt: dateAtNow,
    UpdatedAt: dateAtNow,
  }

  const params = {
    TableName: 'vigistats',
    Item: marshall(item),
  }

  const command = new PutItemCommand(params)

  client
    .send(command)
    .then((response) => {
      console.log('Mail added successfully. Tracking:', mail.PK.split('#')[1])
    })
    .catch((err) => {
      console.error(
        'Unable to add Mail. Error JSON:',
        JSON.stringify(err, null, 2),
      )
    })
})

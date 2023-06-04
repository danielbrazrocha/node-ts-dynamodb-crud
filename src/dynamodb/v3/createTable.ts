import { CreateTableCommand } from '@aws-sdk/client-dynamodb'
import { client } from '@app/lib/dynamoClient'

const main = async () => {
  const command = new CreateTableCommand({
    TableName: 'vigistats',
    KeySchema: [
      { AttributeName: 'PK', KeyType: 'HASH' }, // Partition key like INSPECTED#TrackId (INSPECTED#US123456789CE). Need to be hash key
      { AttributeName: 'SK', KeyType: 'RANGE' }, // Sort key InspectionDate. Must be RANGE key
    ],
    AttributeDefinitions: [
      { AttributeName: 'PK', AttributeType: 'S' }, // Specify the partition key attribute
      { AttributeName: 'SK', AttributeType: 'S' }, // Specify the sort key attribute
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  })

  const response = await client.send(command)
  console.log(response)
  return response
}

main()

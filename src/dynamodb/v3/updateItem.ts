import { UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import { client } from '@app/lib/dynamoClient'

// add, edit or delete attributes from an existing item in the DB,
// should pass only changed attributes, retaining the exists ones

const main = async () => {
  const command = new UpdateItemCommand({
    TableName: 'vigistats',
    Key: {
      PK: { S: 'INSPECTED#US123456789CE' },
      SK: { S: '2023-04-05' },
    },
    UpdateExpression: 'set UpdatedAt = :UpdatedAt',
    ExpressionAttributeValues: {
      ':UpdatedAt': { S: new Date().toISOString() },
    },
    ReturnValues: 'UPDATED_NEW', // ALL_OLD | UPDATED_OLD | ALL_NEW | UPDATED_NEW 
  })

  const { Attributes } = await client.send(command)
  console.log(unmarshall(Attributes))
}

main()

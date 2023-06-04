import { DeleteItemCommand } from '@aws-sdk/client-dynamodb'
import { client } from '@app/lib/dynamoClient'

const main = async () => {
  const command = new DeleteItemCommand({
    TableName: 'vigistats',
    Key: {
      PK: { S: 'INSPECTED#US123456789CE' },
      SK: { S: '2023-04-05' },
    },
  })

  const response = await client.send(command)
  console.log(response)
  //   return response;
}

main()

import { DeleteTableCommand } from '@aws-sdk/client-dynamodb'
import { client } from '@app/lib/dynamoClient'

const main = async () => {
  const command = new DeleteTableCommand({
    TableName: 'vigistats',
  })

  const response = await client.send(command)
  console.log(response)
  return response
}

main()

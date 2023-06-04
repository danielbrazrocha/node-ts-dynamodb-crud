import { ListTablesCommand } from '@aws-sdk/client-dynamodb'
import { client } from '@app/lib/dynamoClient'

const main = async () => {
  const command = new ListTablesCommand({})

  const response = await client.send(command)
  console.log(response)
  return response
}

main()

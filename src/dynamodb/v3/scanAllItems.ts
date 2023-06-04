import { ScanCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import { client } from '@app/lib/dynamoClient'

const params = {
  TableName: 'vigistats',
  ProjectionExpression: 'PK, SK, Inspector, Product, UpdatedAt, Decision',
}

export const main = async () => {
  const command = new ScanCommand(params)

  const response = await client.send(command)
  response.Items.forEach((item) => {
    console.log(unmarshall(item))
  })
  // console.log(response)
  return response
}

main()

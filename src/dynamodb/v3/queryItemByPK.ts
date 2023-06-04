import { QueryCommand, QueryCommandOutput } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { client } from '@app/lib/dynamoClient'

const pk = 'INSPECTED#US123456789CE'
const params = {
  TableName: 'vigistats',
  // ExpressionAttributeValues: {
  //   ':PK': {
  //     S: pk,
  //   },
  // },
  ExpressionAttributeValues: marshall({
    ':PK': pk,
  }),
  KeyConditionExpression: 'PK = :PK',
  // ProjectionExpression: "Inspector",  // return all attributes if not listed
}

const main = async (): Promise<any> => {
  const command = new QueryCommand(params)

  const { Items } = (await client.send(command)) as QueryCommandOutput
  //   response.Items.forEach(function (pie) {
  //     console.log(`${pie.Flavor.S} - ${pie.Description.S}\n`);
  //   });
  // console.log(unmarshall(response.Items[0]))
  console.log(unmarshall(Items[0]))
}

main()

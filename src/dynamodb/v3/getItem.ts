import { GetItemCommand, GetItemCommandOutput } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import { client } from '@app/lib/dynamoClient'

const main = async (): Promise<any> => {
  const command = new GetItemCommand({
    TableName: 'vigistats',
    Key: {
      PK: { S: 'INSPECTED#US123456789CE' },
      SK: { S: '2023-04-05' },
    },
  })

  try {
    const { Item } = (await client.send(command)) as GetItemCommandOutput
    console.log('Success', unmarshall(Item))
  } catch (error) {
    console.log('Error', error)
  }

  /* Return example
    Item = {
      CreatedAt: '2023-06-04T03:26:56.122Z',
      SK: '2023-04-05',
      Product: 'Eletronics',
      Inspector: { id: '1', Name: 'Jhon Arias' },
      PK: 'INSPECTED#US123456789CE',
      UpdatedAt: '2023-06-04T03:26:56.122Z',
      Decision: 'Approve'
    }
    */
}

main()

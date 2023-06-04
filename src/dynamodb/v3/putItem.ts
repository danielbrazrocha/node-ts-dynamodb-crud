import { PutItemCommand } from '@aws-sdk/client-dynamodb'
import { client } from '@app/lib/dynamoClient'

//  replace an existing item or to create a new item, need to pass all attributes

const params = {
  Item: {
    PK: {
      S: 'MAIL#US123456789CE9',
    },
    SK: {
      S: '2023-04-05',
    },
    Product: {
      S: 'Eletronics',
    },
    Decision: {
      S: 'Approve',
    },
    Inspector: {
      M: {
        Name: {
          S: 'Jhon2',
        },
        CPF: {
          N: '123456789',
        },
      },
    },
  },
  ReturnConsumedCapacity: 'TOTAL',
  TableName: 'vigistats',
}

const main = async () => {
  const command = new PutItemCommand(params)

  const response = await client.send(command)
  console.log(response)
  //   return response;
}

main()

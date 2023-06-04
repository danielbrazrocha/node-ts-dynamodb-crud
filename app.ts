import { client } from './src/lib/dynamoClient'
import {
  QueryCommand,
  QueryCommandOutput,
  ScanCommand,
} from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import express, { Request, Response } from 'express'
import path from 'path'
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

export const app = express()

app.listen(3221, () => console.log('Cars API listening on port 3221!'))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('views', path.join(__dirname, 'src', 'views'))
app.set('view engine', 'jade')

app.get('/', function (_: Request, res: Response) {
  res.send({ title: 'API Entry Point' })
})

app.get('/error', function (_: Request, res: Response) {
  res.render('error')
})

app.get('/mail', async function (_: Request, res: Response) {
  const params = {
    TableName: 'vigistats',
    ProjectionExpression: 'PK, SK, Inspector, Product, UpdatedAt, Decision',
  }

  console.log('Scanning vigistats table.')
  const command = new ScanCommand(params)

  try {
    const { Items } = await client.send(command)
    const jsonItens = Items.map((item) => {
      return unmarshall(item)
    })
    return res.send(jsonItens)
  } catch (error) {
    console.error(
      'Unable to scan the table. Error JSON:',
      JSON.stringify(error, null, 2),
    )
  }
})

app.get('/mail/:id', async function (req: Request, res: Response) {
  const mailID = req.params.id

  const params = {
    TableName: 'vigistats',
    KeyConditionExpression: 'PK = :PK',
    ExpressionAttributeValues: marshall({
      ':PK': `INSPECTED#${mailID}`,
    }),
  }

  try {
    const command = new QueryCommand(params)
    const { Items } = (await client.send(command)) as QueryCommandOutput

    if (Items.length === 0) {
      const errorStatus = {
        status: '404',
        stack: 'Mail not found!',
      }
      return res.render('error', {
        error: errorStatus,
      })
    }

    console.log('Query succeeded.')
    console.log(Items[0])
    return res.send(unmarshall(Items[0]))
  } catch (error) {
    console.error('Unable to query. Error:', JSON.stringify(error, null, 2))
  }
})

app.use((_: Request, res: Response) => {
  res.status(404).send("Error 404. Sorry can't find that!")
})
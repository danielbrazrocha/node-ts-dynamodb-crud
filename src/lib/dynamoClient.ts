import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

const clientParams = {
  region: 'local',
  endpoint: 'http://localhost:8000',
}

export const client = new DynamoDBClient(clientParams)

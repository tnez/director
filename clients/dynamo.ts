import aws from 'aws-sdk'
import * as z from 'zod'
import * as dotenv from 'dotenv'

dotenv.config()

const Env = z.object({
  DYNAMO_AWS_REGION: z.string(),
  DYNAMO_KEY_ID: z.string(),
  DYNAMO_KEY_SECRET: z.string(),
  DYNAMO_TABLE_NAME: z.string(),
})

const env = Env.parse(process.env)

const DocumentClient = aws.DynamoDB.DocumentClient

const client = new DocumentClient({
  accessKeyId: env.DYNAMO_KEY_ID,
  secretAccessKey: env.DYNAMO_KEY_SECRET,
  region: env.DYNAMO_AWS_REGION,
  params: {
    TableName: env.DYNAMO_TABLE_NAME,
  },
})

type OmitTableName<T> = Omit<T, 'TableName'>

const api = Object.freeze({
  get: async (
    parameters: OmitTableName<aws.DynamoDB.DocumentClient.GetItemInput>,
  ) =>
    client.get({ TableName: env.DYNAMO_TABLE_NAME, ...parameters }).promise(),
  put: async (
    parameters: OmitTableName<aws.DynamoDB.DocumentClient.PutItemInput>,
  ) =>
    client.put({ TableName: env.DYNAMO_TABLE_NAME, ...parameters }).promise(),
  query: async (
    parameters: OmitTableName<aws.DynamoDB.DocumentClient.QueryInput>,
  ) =>
    client.query({ TableName: env.DYNAMO_TABLE_NAME, ...parameters }).promise(),
  update: async (
    parameters: OmitTableName<aws.DynamoDB.DocumentClient.UpdateItemInput>,
  ) =>
    client
      .update({ TableName: env.DYNAMO_TABLE_NAME, ...parameters })
      .promise(),
  delete: async (
    parameters: OmitTableName<aws.DynamoDB.DocumentClient.DeleteItemInput>,
  ) =>
    client
      .delete({ TableName: env.DYNAMO_TABLE_NAME, ...parameters })
      .promise(),
})

export default api

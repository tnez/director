import { NextApiHandler } from 'next'
import * as z from 'zod'
import { createLink } from '../../clients/data'
import { generateReferralLink } from '../../utils'

const HandlePostBody = z.object({
  domain: z.string(),
  email: z.string(),
})
const handlePost: NextApiHandler = async (request, response) => {
  const { domain, email } = HandlePostBody.parse(request.body)
  const key = generateReferralLink({ domain })
  const destination = `${domain}/dest`

  let data
  let error
  let status = 201
  try {
    await createLink({ key, email, destination })
    data = { link: key }
  } catch (theError: unknown) {
    error = theError
    status = 500
  } finally {
    response.status(status).json({
      ok: status === 201,
      data,
      error,
    })
  }
}

const HANDLER: Record<string, NextApiHandler> = Object.freeze({
  POST: handlePost,
})

const root: NextApiHandler = async (request, response) => {
  const handler = HANDLER[request.method ?? 'NONE']
  if (handler === undefined) {
    throw new Error('Method Not Implemented')
  }

  return handler(request, response)
}

export default root

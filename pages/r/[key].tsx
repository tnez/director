import * as React from 'react'
import { GetServerSideProps } from 'next'
import * as z from 'zod'
import { getLink } from '../../clients/data'

const RedirectPage: React.FC = () => null

const Query = z.object({
  key: z.string(),
})

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { key } = Query.parse(ctx.query)
  const host = ctx.req.headers.host ?? ''
  const protocol = host.includes('localhost') ? 'http' : 'https'
  const link = await getLink(`${protocol}://${host}/r/${key}`)

  return {
    redirect: {
      destination: `/dest?referrer=${link.email}`,
      permanent: false,
    },
  }
}

export default RedirectPage

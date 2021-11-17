import * as React from 'react'
import { GetServerSideProps } from 'next'
import { VStack, Text } from '@chakra-ui/react'
import * as z from 'zod'

type DestPageProps = {
  referrer: string
}

const DestPage: React.FC<DestPageProps> = ({ referrer }) => {
  return (
    <VStack minH="100vh" justify="center" fontSize="2xl">
      <Text>You&apos;ve made it to your destination 🎉</Text>
      <Text fontSize="lg">Thank you {referrer}!</Text>
    </VStack>
  )
}

const Query = z.object({
  referrer: z.string(),
})

export const getServerSideProps: GetServerSideProps<DestPageProps> = async (
  ctx,
) => {
  const { referrer } = Query.parse(ctx.query)

  return {
    props: {
      referrer,
    },
  }
}

export default DestPage

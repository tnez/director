import * as React from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { generateReferralLink } from '../utils'

export default function GetLinkPage() {
  const [referralLink, setReferralLink] = React.useState<string | undefined>(
    undefined,
  )
  const handleSubmit = () => {
    const newReferralLink = generateReferralLink({ domain: location.origin })
    setReferralLink(newReferralLink)
  }

  return (
    <VStack minH="100vh" justify="center" fontSize="2xl">
      {referralLink ? (
        <ReferralLink link={referralLink} />
      ) : (
        <EmailForm onSubmit={handleSubmit} />
      )}
    </VStack>
  )
}

type EmailFormProps = {
  onSubmit: () => void
}
function EmailForm({ onSubmit }: EmailFormProps) {
  return (
    <VStack as="form" onSubmit={onSubmit}>
      <Text fontWeight="bold">Enter your email and receive your link:</Text>
      <InputGroup>
        <Input id="email" type="email" placeholder="someone@example.com" />
        <InputRightAddon>
          <Box as="button" type="submit">
            Submit
          </Box>
        </InputRightAddon>
      </InputGroup>
    </VStack>
  )
}

type ReferralLinkProps = {
  link: string
}
function ReferralLink({ link }: ReferralLinkProps) {
  return (
    <VStack>
      <Text fontWeight="bold">Much wow! You did it 🎉</Text>
      <Text id="referral-link" kbd>
        {link}
      </Text>
    </VStack>
  )
}

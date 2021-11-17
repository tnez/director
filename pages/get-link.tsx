import * as React from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  VStack,
} from '@chakra-ui/react'

export default function GetLinkPage() {
  const [referralLink, setReferralLink] = React.useState<string | undefined>(
    undefined,
  )
  const handleSubmit = async (email: string) => {
    const response = await fetch('/api/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domain: location.origin,
        email,
      }),
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data } = await response.json()
    setReferralLink(data.link)
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
  onSubmit: (email: string) => void
}
function EmailForm({ onSubmit }: EmailFormProps) {
  const emailInputRef = React.useRef<HTMLInputElement>(null)
  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault()
    const email = emailInputRef.current?.value
    if (email !== undefined) {
      onSubmit(email)
    }
  }

  return (
    <VStack as="form" onSubmit={handleSubmit}>
      <Text fontWeight="bold">Enter your email and receive your link:</Text>
      <InputGroup>
        <Input
          id="email"
          type="email"
          placeholder="someone@example.com"
          ref={emailInputRef}
        />
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

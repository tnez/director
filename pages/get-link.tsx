import * as React from 'react'
import { generateReferralLink } from '../utils'

export default function GetLinkPage() {
  const [referralLink, setReferralLink] = React.useState<string | undefined>(
    undefined,
  )
  const handleSubmit = () => {
    const newReferralLink = generateReferralLink({ domain: location.origin })
    setReferralLink(newReferralLink)
  }

  return referralLink ? (
    <ReferralLink link={referralLink} />
  ) : (
    <EmailForm onSubmit={handleSubmit} />
  )
}

type EmailFormProps = {
  onSubmit: () => void
}
function EmailForm({ onSubmit }: EmailFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" />
      <button type="submit">Submit</button>
    </form>
  )
}

type ReferralLinkProps = {
  link: string
}
function ReferralLink({ link }: ReferralLinkProps) {
  return <p id="referral-link">{link}</p>
}

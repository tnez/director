import * as uuid from 'uuid'

type GenerateReferralLinkInput = {
  /**
   * The root of the domain.
   */
  domain: string
}

/**
 * Return a randomly generated referral link.
 *
 * @example
 * generateReferralLink({ domain: 'sub.domain.io'})
 * // => 'sub.domain.io/abcd-1234'
 */
export function generateReferralLink({ domain }: GenerateReferralLinkInput) {
  const code = uuid.v4().split('-')[0]
  return domain + '/r/' + code
}

import { generateReferralLink } from '..'

it('should return value that matches expected pattern', () => {
  const result = generateReferralLink({ domain: 'localhost:3000' })
  expect(result).toMatch(/localhost:3000\/r\/[\da-f]{8}$/)
})

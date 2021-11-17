import * as faker from 'faker'

describe('given a valid link exists', () => {
  const email = faker.internet.email()
  let link: string

  before(() => {
    cy.request('POST', '/api/link', {
      domain: Cypress.config().baseUrl,
      email,
    }).then((response) => {
      link = response.body.data.link as string
    })
  })

  describe('when a redirectee requests the link', () => {
    before(() => {
      cy.visit(link)
    })

    it('should direct them to the destination', () => {
      cy.url().should('match', /\/dest/)
    })

    it('should display thank you to referee', () => {
      cy.findByText(`Thank you ${email}!`)
    })
  })
})

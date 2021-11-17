import * as faker from 'faker'

describe('POST /api/link', () => {
  describe('when creating a link for a new user', () => {
    it('should return expected response', () => {
      cy.request({
        method: 'POST',
        url: '/api/link',
        body: {
          domain: Cypress.config().baseUrl,
          email: faker.internet.email(),
        },
      }).should((response) => {
        expect(response.status).to.equal(201)
        expect(response.body).to.have.ownProperty('ok', true)
        expect(response.body).to.have.ownProperty('data')
        expect(response.body.data).to.have.ownProperty('link')
        expect(response.body.data.link).to.be.a('string')
      })
    })
  })
})

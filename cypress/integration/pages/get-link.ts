import * as faker from 'faker'

describe('when the user visits the page', () => {
  it('should render without error', () => {
    cy.visit('/get-link')
  })

  it('should render an input for user email', () => {
    cy.visit('/get-link')
    cy.get('input[id="email"]').should('be.visible')
  })

  describe('when a user requests a link', () => {
    let email: string
    before(() => {
      email = faker.internet.email()

      cy.intercept('POST', '/api/link', (request) => {
        expect(request.body).to.have.ownProperty('domain')
        expect(request.body).to.have.ownProperty('email')

        return {
          statusCode: 201,
          body: {
            ok: true,
            data: {
              link: 'http://localhost/abcd123fe',
            },
          },
        }
      }).as('postNewLink')

      cy.visit('/get-link')
      cy.get('input[id="email"]').type(email)
      cy.get('button[type="submit"]').click()
    })

    it('should call the api with expected arguments', () => {
      cy.wait('@postNewLink')
    })

    it('should give the user a link', () => {
      cy.get('[id="referral-link"]').should('be.visible')
    })
  })
})

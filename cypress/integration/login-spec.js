describe ('login test',() => {
	const username = 'admin'
	const password = 'password123'
	context('unauthorized', () => {
	it('is redirected to /unauthorized when not logged in', () => {
		cy.visit('/dashboard/')
		cy.url().should('include','unauthorized')
		})
	})
})

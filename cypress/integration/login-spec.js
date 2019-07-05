describe ('login test',() => {
	const username = 'admin'
	const password = 'password123'
	context('unauthorized', () => {
	it('is redirected to /unauthorized when not logged in', () => {
		cy.visit('/dashboard/')
		cy.url().should('include','unauthorized')
		cy.get('h3').should('contain', 'You are not logged in')
		//cy.get('a[href]').should('exist')
		cy.get('a').should('have.attr', 'href')
		  .then(href=>cy.visit(href))
		})
	})
	context('login', () => {
	beforeEach(() => {
		cy.visit('/login')
		})
	it('redirects to /dashboard on successful login', () => {
		cy.get('input[name=username]')
		  .type(username)
		cy.get('input[name=password]')
		  .type(password)
		cy.get('form').submit()
		//cy.get('button').click()
		cy.url().should('include', 'dashboard')
		})
	it('redirects to /login on error', () => {
		cy.get('input[name=username]').type('trololo')
		cy.get('input[name=password]').type('again')
		cy.get('form').submit()
		cy.url().should('include', 'login')
		cy.get('p').should('have.class', 'error')
		  .should('contain','incorrect')
		})
	})
})

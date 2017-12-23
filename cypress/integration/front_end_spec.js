describe('Gets Home Page', function() {
    it('Visits home', function() {
      cy.visit('http://localhost:8080')
    })
})

describe('Open Navbar', function() {
    it('Button Exist?', function() {
      cy.visit('http://localhost:8080')
      cy.get('.navbar-toggler').click()
    })
})

describe('Scrape Button There?', function() {
    it('Clicks the Scrape Button', function() {
      cy.get('.navbar-toggler').click()
      cy.get('#scrapeButton').click()
    })
})
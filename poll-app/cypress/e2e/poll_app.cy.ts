describe('Polls', function() {

  it('front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Polls')
    cy.contains('What do you find scariest?')
  })

  it('Poll form can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Add Poll').click()
    cy.contains('Create a Poll')
  })

  it('If Form cancelled, nothing is added', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Add Poll').click()
    cy.contains('Create a Poll')
    cy.get('#poll').type('This is a test poll')
    cy.get('#submit').click()
    cy.contains('Choose options for poll: This is a test poll')
    cy.get('#option1').type('option1')
    cy.get('#option2').type('option1')
    cy.get('#cancelForm').click()
    cy.visit('http://localhost:3000')
    cy.contains('This is a test poll').should('not.exist');
  })

  it('Poll can be added', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Add Poll').click()
    cy.contains('Create a Poll')
    cy.get('#poll').type('This is a test poll')
    cy.get('#submit').click()
    cy.contains('Choose options for poll: This is a test poll')
    cy.get('#option1').type('option1')
    cy.get('#option2').type('option1')
    cy.get('#submitchoices').click()
    cy.contains('New Poll This is a test poll added successfully')
    cy.visit('http://localhost:3000')
    cy.contains('This is a test poll')
  })

  it('Poll can be voted', function() {
    cy.visit('http://localhost:3000')
    cy.contains('This is a test poll').click()
    cy.get('#results').click()
    cy.contains('This poll has 0 answers')
    cy.get('#answer').click()
    cy.get('#option1').click()
    cy.get('#confirm').click()
    cy.contains('This poll has 1 answers')

  })
})

export {}    
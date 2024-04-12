describe('Todo List App Test Suite', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  it('should display the title, the header, and an empty todo list', () => {
    cy.title().should('include', 'Todo List')
    cy.get('h1').should('contain', 'Todo List')
    cy.get('ul li').should('have.length', 0)
  })

  it('should add a new todo to the todo list', () => {
    const todoText = 'Code'
    cy.get('input[type="text"]').type(todoText)
    cy.get('form').submit()
    cy.get('ul li').should('have.length', 1)
    cy.get('ul li').eq(0).should('contain', todoText)
  })

  it('should toggle the todo completion status', () => {
    const todoText = 'Code'
    cy.get('input[type="text"]').type(todoText)
    cy.get('form').submit()
    cy.get('ul li input[type="checkbox"]').check()
    cy.get('ul li label').should('have.class', 'completed')
  })

  it('should delete the todo from the todo list', () => {
    const todoText = 'Code'
    cy.get('input[type="text"]').type(todoText)
    cy.get('form').submit()
    cy.get('ul li button').click()
    cy.get('ul li').should('have.length', 0)
  })


})
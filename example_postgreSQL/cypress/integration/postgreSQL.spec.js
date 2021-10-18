/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress


describe('example to-do app', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('https://example.cypress.io/todo')

  })

  it('Delete database', () => {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `
      delete from device where id = 5;
      `
    }).then((result) => {
      console.log(result)
      
    });
  })

  it('First check database', () => {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `
      select * from device   
      `
    }).then((result) => {
      console.log(result.rows)
      expect(result.rows[0].os_name).to.have.string('Windows');
      expect(result.rows[1].os_name).to.have.string('Linux');
      expect(result.rows[2].os_name).to.have.string('MacOS');
    });
  })
  

  it('Insert database', () => {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `
      INSERT INTO public.device(
        id, os_name)
        VALUES (5, 'Demo Insert');
      `
    }).then((result) => {
      console.log(result)
    });
  })

  it('Get again check database', () => {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `
      select * from device   
      `
    }).then((result) => {
      console.log(result.rows)
      expect(result.rows[0].os_name).to.have.string('Windows');
      expect(result.rows[1].os_name).to.have.string('Linux');
      expect(result.rows[2].os_name).to.have.string('MacOS');
    });
  })

  
})

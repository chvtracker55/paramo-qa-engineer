/// <reference types="cypress" />

const homePage = require("../pages/homePage")
const signUpPage = require("../pages/signUp.page")
const welcomeModalModal = require("../pages/welcomeModal.modal")

describe('Demo Casino Test Suite', () => {

  beforeEach(() => {
    cy.visit('https://demo.casino/', { failOnStatusCode : false })
  })

  context('Welcome Modal', () => {
    
    it('Learn More', () => {
      welcomeModalModal.learnMoreButton.click()
      cy.url().should('include', '/info/terms-of-us')
    })

    it('Close with X Button', () => {
      welcomeModalModal.closeButton.should('be.enabled')
      welcomeModalModal.closeButton.click()
      welcomeModalModal.modal.should('not.be.visible')
    })

    it('Close with "Got it" Button', () => {
      welcomeModalModal.gotItButton.should('be.enabled')
      welcomeModalModal.gotItButton.click()
      welcomeModalModal.modal.should('not.be.visible')
    })

  })

  context('Sign Up', () => {

    beforeEach(() => {
      // In each test we need to close the welcome modal
      // I put this code here to avoid repeat in each test
      welcomeModalModal.closeButton.then(($el) => {
        $el.click()
        homePage.signUpButton.click()
        cy.url().should('include', '/user/registration')
      })
    })

    // Verifiy if elements exists and are enable to be used
    it('Form Elements', () => {
      signUpPage.emailInput.should('be.enabled')
      signUpPage.termsChk.should('be.enabled')
      signUpPage.passwordInput.should('be.enabled')
      signUpPage.passwordConfirmationInput.should('be.enabled')
      signUpPage.promoCodeInput.should('be.enabled')
      signUpPage.createAccountButton.should('be.enabled')
    })

    // Verify error messages
    // sometimes fails because captcha appears! :(
    it('Error Messages', () => {
      signUpPage.createAccountButton.click()
      cy.getByDataTest('error-email').should('be.visible')
      cy.getByDataTest('error-terms_and_conditions').should('be.visible')
      cy.getByDataTest('error-password').should('be.visible')
      cy.getByDataTest('error-password_confirmation').should('be.visible')
      cy.get('.form__input > .form__notification--error').should('be.visible') 
    })

    // Verify the switch between the email and phone input
    it('Email Phone switch', () => {
      signUpPage.emailInput.should('be.visible')
      signUpPage.phoneInput.should('be.not.visible')
      cy.contains('li', 'Phone').click()
      signUpPage.emailInput.should('be.not.visible')
      signUpPage.phoneInput.should('be.visible')
    })

    // Verify the invalid email message
    // sometimes fails because captcha appears! :(
    it('Invalid email', () => {
      signUpPage.emailInput.type('invalid_email')
      signUpPage.createAccountButton.click()
      cy.getByDataTest('error-email').should('be.visible')
      cy.getByDataTest('error-email').should(($el) => {
        expect($el).to.contain('Invalid email')
      })
    })

    // Verify the invalid password message
    // sometimes fails because captcha appears! :(
    it('Password blank', () => {
      signUpPage.createAccountButton.click()
      cy.get('[data-test*="error-password"]').should(($el) => {
        expect($el).to.have.length(2) // for both fields
        const firstFieldMessage = $el[0].textContent
        const secondFieldMessage = $el[1].textContent
        expect(firstFieldMessage).to.contain('Password cannot be blank')
        expect(secondFieldMessage).to.contain('Password confirmation cannot be blank')
      })
    })

    // Verify the change the attribute of the passwords inputs
    it('Password view', () => {
      signUpPage.passwordInput.should('have.attr', 'type', 'password')
      signUpPage.passwordConfirmationInput.should('have.attr', 'type', 'password')
      cy.get('.pass-switch').click({ multiple : true })
      signUpPage.passwordInput.should('have.attr', 'type', 'text')
      signUpPage.passwordConfirmationInput.should('have.attr', 'type', 'text')
    })

    // Verify the invalid password message
    // sometimes fails because captcha appears! :(
    it('Password error', () => {
      signUpPage.passwordInput.type('a')
      signUpPage.passwordConfirmationInput.type('b')
      signUpPage.createAccountButton.click()

      cy.get('[data-test*="error-password"]').should(($el) => {
        expect($el).to.have.length(2) // for both fields
        const firstFieldMessage = $el[0].textContent
        const secondFieldMessage = $el[1].textContent
        expect(firstFieldMessage).to.contain('Required 1 digit')
        expect(firstFieldMessage).to.contain('Required 1 capital letter')
        expect(firstFieldMessage).to.contain('Required Password is too short (minimum is 6 characters)')
        expect(secondFieldMessage).to.contain('Password must be strictly repeated')
      })
    })

    // Lets do the registration
    // sometimes fails because captcha appears! :(
    it('Successful registration', () => {
      signUpPage.emailInput.type('test@email.com')
      signUpPage.passwordInput.type('Asd123')
      signUpPage.passwordConfirmationInput.type('Asd123')
      signUpPage.termsChk.click({ force : true })
      signUpPage.noBonusOption.click({ force : true })
      signUpPage.createAccountButton.click()
      // probably captcha!
      cy.url().should('include', '/registrationSuccess')
    })
  })

}) 
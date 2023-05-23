class SignUpPage {

    get emailInput(){
        return cy.getByDataTest('input-email')
    }

    get phoneInput(){
        return cy.getByDataTest('input-phone')
    }
    
    get termsChk(){
        return cy.getByDataTest('input-terms_and_conditions')
    }

    get passwordInput(){
        return cy.getByDataTest('input-password')
    }

    get passwordConfirmationInput(){
        return cy.getByDataTest('input-password_confirmation')
    }

    get promoCodeInput(){
        return cy.getByDataTest('input-promo_code')
    }

    get noBonusOption(){
        return cy.get('#bonus-0')
    }

    get createAccountButton(){
        return cy.getByDataTest('control-submit')
    }
}

module.exports = new SignUpPage()
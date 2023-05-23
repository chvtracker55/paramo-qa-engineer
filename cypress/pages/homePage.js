class HomePage {
    get signUpButton(){
        return cy.getByDataTest('nav-reg-head')
    }
}

module.exports = new HomePage()
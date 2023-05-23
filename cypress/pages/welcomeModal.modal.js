class WelcomeModal {
    get learnMoreButton(){
        return cy.get('#welcome_modal a[href="/info/terms-of-us"]')
    }

    get closeButton(){
        return cy.get('button[title="Close (Esc)"]')
    }

    get gotItButton(){
        return cy.get('#welcome_modal .modal__buttons > button')
    }

    get modal(){
        return cy.get('#welcome_modal')
    }
}

module.exports = new WelcomeModal()
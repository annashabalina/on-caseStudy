const CheckoutRegistrationPage = function () {

    this.fillInEMailAndSubmit = function (email) {
        cy.get("input#email").type(email);
        return cy.get("form.checkout-guest-login-form").submit()
    }
}
module.exports = CheckoutRegistrationPage;

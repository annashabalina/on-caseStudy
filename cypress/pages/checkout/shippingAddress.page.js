const ShippingAddressPage = function () {
    this.verifyEmailVisible = function (expectedEmail) {
        return cy.get("div.checkout-info-tile").should("contain.text", expectedEmail);
    }

    this.fillInAddress = function (address) {
        cy.get("input#firstname").type(address.firstname);
        cy.get("input#lastname").type(address.lastname);
        cy.get("input#address1").type(address.streetAndHouseNumber);
        cy.get("input#zipcode").type(address.zipcode);
        cy.get("input#city").type(address.city);
        cy.get("input#phone").type(address.phoneNumber);
        cy.contains("button", "Show Shipping Options").click()
    }

    this.verifyDefaultShippingMethodAndSubmit = function () {
        cy.get("div[class*=selected]").should("have.text", "Standard Delivery");
        cy.get("form.checkout-shipping-method-form").submit()
    }
}

module.exports = ShippingAddressPage;

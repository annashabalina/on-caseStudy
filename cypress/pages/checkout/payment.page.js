const CheckoutPaymentPage = function () {

    this.verifyOrderSummary = function (expectedOrderInfo) {
        cy.get("div.checkout-info-summary").within(() => {
            cy.contains("div.checkout-info-tile", "Email").should("have.text", expectedOrderInfo.email);
            cy.contains("div.checkout-info-tile", "Shipping")
                .find("div.checkout-info-tile__details")
                .within(() => {
                    cy.get("div.address-multiline__line--fullname").should("have.text", expectedOrderInfo.fullname);
                    cy.get("div.address-multiline__line--address1").should("have.text", expectedOrderInfo.addressLine1);
                    cy.get("div.address-multiline__line--zipcode").should("have.text", expectedOrderInfo.zipcode);
                    cy.get("div.address-multiline__line--city").should("have.text", expectedOrderInfo.city);
                });
            cy.contains("div.checkout-info-tile", "Delivery").should("have.text", expectedOrderInfo.deliveryType);
            cy.get("p.estimated-delivery").should("have.text", "Estimated delivery by")
        });
    }

    this.verifyDefaultBillingAddress = function () {
        cy.get("div.payment__billing").within(() => {
            //verify same as shipping address is checked
            cy.get("#toggleBillingAddress").should("be.checked");
        });
    }

    this.payWithCard = function (cardData) {
        cy.contains("div", "Payment").within(() => {
            cy.contains("div", "Pay with Card").click();
            cy.get("#encryptedCardNumber").type(cardData.cardNumber);
            cy.get("#encryptedExpiryDate").type(cardData.expirationDate);
            cy.get("#encryptedSecurityCode").type(cardData.cvv);
            cy.get("#nameoncard").type(cardData.cardholder);
            cy.submit()
        })
    }

    this.payWithMastercard = function (cardHolderName) {
        return this.payWithCard({
            cardNumber: "5577 0000 5577 0004",
            expirationDate: "03/30",
            cvv: "737",
            cardholder: cardHolderName
        })
    }
}
module.exports = CheckoutPaymentPage;

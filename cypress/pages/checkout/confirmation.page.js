const OrderConfirmationPage = function () {
    this.verifyItemDetails = function (expectedOrderInfo) {
        cy.get("div.order-items").within(() => {
            cy.get("a.order-item__title").should("have.text", expectedOrderInfo.itemTitle);
            cy.get("div.order-item__size").should("have.text", expectedOrderInfo.itemSize);
            cy.get("a.order-item__price").should("have.text", expectedOrderInfo.itemPrice);
        })
    }

    this.verifyShippingAddress = function (expectedAddress) {
        cy.get("div.confirmation-container__order-details-item--shipping")
            .should("contain.text", Object.values(expectedAddress).join(" "))
    }

    this.verifyBillingAddress = function (expectedAddress) {
        cy.get("div.confirmation-container__order-details-item--billing")
            //for readability i chose to pass expected address as an object
            //for the sake of simplicity, i join the in one string and compare
            // to the string i get from the confirmation container div.
            .should("contain.text", Object.values(expectedAddress).join(" "))
    };

    this.verifyShippingAndBillingAddress = function (expectedAddress) {
        this.verifyShippingAddress(expectedAddress);
        this.verifyBillingAddress(expectedAddress);
    }

    this.verifyDeliveryOption = function (selectedOption) {
        cy.contains("div", "Delivery Option").should("contain.text", selectedOption)
    }

    this.verifyOrderNumberDisplayed = function(){
        cy.contains("div", "Order Number")
            .find("p.confirmation-container__order-details-item-text")
            .should("not.be.empty");
    }

}
module.exports = OrderConfirmationPage;

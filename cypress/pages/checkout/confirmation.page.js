const OrderConfirmationPage = function () {
    this.verifyItemDetails = function (expectedOrderInfo) {
        cy.get("div.order-items").within(() => {
            //verify item name
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
            .should("have.text");
    }

}
module.exports = OrderConfirmationPage;

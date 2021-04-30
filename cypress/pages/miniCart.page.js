const MiniCartPage = function () {

    //this is not the most elegant way to get details of the first item in the cart.
    // but this is the only way i could think of while working on the use case.
    this.getDetailsOfTheFirstItemInTheCard = function () {
        const parent = "div.order-item--first"
        return cy.get(parent).find('a.order-item__title').invoke("text")
            .then(iTitle => {
                return cy.get(parent).find("div.order-item__color").invoke("text")
                    .then(iColor => {
                        return cy.get(parent).find("div.order-item__size").invoke("text")
                            .then(iSize => {
                                return cy.get(parent).find("div.order-item__price").invoke("text")
                                    .then(iPrice => {
                                        return {
                                            itemTitle: iTitle,
                                            itemColor: iColor,
                                            itemSize: iSize,
                                            itemPrice: iPrice
                                        }
                                    })
                            })
                    })
            })
    }

    this.proceedToCheckout = function () {
        return cy.contains("a", "Checkout").click();
    }

    this.verifyCartDetails = function (expectedDetails) {
        cy.get("div.order-totals").within(() => {
            cy.contains("div", "Subtotal").next().should("have.text", expectedDetails.subtotal)
            cy.contains("div", "Shipping").next().should("have.text", expectedDetails.shippingCost)
            cy.contains("div", "Incl. Tax").should("not.be.empty")
            cy.contains("div", "Total").next().should("have.text", expectedDetails.totalPrice)
        });
    }
}

module.exports = MiniCartPage;

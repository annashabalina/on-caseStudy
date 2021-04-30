const ExploreWomensPage = function () {

    //selectors

    // functions
    this.addFirstFoundItemToTheCart = function (size = "37") {
        cy.get("button.quick-add-button").first().click();
        // cy.wait(1500);
        cy.contains("div.sizes__size", size).click();
    }
}

module.exports = ExploreWomensPage;

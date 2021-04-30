const ExploreWomensPage = function () {

    this.addFirstFoundItemToTheCart = function (size = "37") {
        cy.get("button.quick-add-button").first().click();
        cy.contains("div.sizes__size", size).click();
    }
}

module.exports = ExploreWomensPage;

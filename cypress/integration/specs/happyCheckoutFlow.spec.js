const ExploreWomensPage = require("../../pages/exploreWomens.page");
const MiniCartPage = require("../../pages/miniCart.page");
const CheckoutRegistrationPage = require("../../pages/checkout/checkoutRegistration.page");
const ShippingAddressPage = require("../../pages/checkout/shippingAddress.page");
const CheckoutPaymentPage = require("../../pages/checkout/payment.page");
const OrderConfirmationPage = require("../../pages/checkout/confirmation.page");
const standardDelivery = require("../../enums/shippingOptions");
const {exploreRoutes, checkoutRoutes} = require("../../enums/routes");

describe('Checkout flow: Unregistered customer from Germany pays with Mastercard', () => {
    let itemDetails = {};
    const exploreWomenPage = new ExploreWomensPage();
    const miniCart = new MiniCartPage();
    const checkoutRegistrationPage = new CheckoutRegistrationPage()
    const shippingAddressPage = new ShippingAddressPage();
    const paymentPage = new CheckoutPaymentPage()
    const confirmationPage = new OrderConfirmationPage();

    const emailAddress = "test@usecase.com"
    const userInformation = {
        firstname: "Test",
        lastname: "User",
        streetAndHouseNumber: "t1",
        zipcode: 10111,
        city: "Berlin",
        phoneNumber: 111
    }

    before(() => {
        //to save some time, go directly to the page where the purchase will be done
        cy.visit(exploreRoutes.women);
        exploreWomenPage.addFirstFoundItemToTheCart();
        miniCart.getDetailsOfTheFirstItemInTheCard().then(data => {
            itemDetails = data;
            miniCart.proceedToCheckout();
        });
    })

    it('Checkout, step 1: Registration', () => {
        //get details of the added item to assert during checkout process
        cy.url().should("contain", checkoutRoutes.registration);
        checkoutRegistrationPage.fillInEMailAndSubmit(emailAddress)
        cy.url().should("contains", checkoutRoutes.shipping);
    });

    it("Checkout, step 2: Shipping Address", function () {
        shippingAddressPage.verifyEmailVisible(emailAddress)

        shippingAddressPage.fillInAddress(userInformation)

        //assert standard delivery is selected
        shippingAddressPage.verifyDefaultShippingMethodAndSubmit();
        cy.url().should("contains", checkoutRoutes.payment);
    })

    it("Checkout, step 3: Payment", function () {
        //Payment
        //verify order summary
        paymentPage.verifyOrderSummary({
            email: emailAddress,
            fullname: `${userInformation.firstname} ${userInformation.lastname}`,
            addressLine1: userInformation.streetAndHouseNumber,
            zipcode: userInformation.zipcode,
            city: userInformation.city,
            deliveryType: standardDelivery.name
        })

        // billing address
        paymentPage.verifyDefaultBillingAddress()

        miniCart.verifyCartDetails({
            subtotal: itemDetails.itemPrice,
            shippingCost: standardDelivery.price,
            totalPrice: itemDetails.itemPrice
        });

        // skip verifying promo code & gift card as this spec does not use any of those.
        //select pay with card option
        paymentPage.payWithMastercard(`${userInformation.firstname} ${userInformation.lastname}`)
        //confirmation page
        cy.url().should("contains", checkoutRoutes.confirmation);
    })

    it("Checkout, step 4: Verify Order Confirmation Page", function () {
        confirmationPage.verifyItemDetails(itemDetails);
        miniCart.verifyCartDetails({
            subtotal: itemDetails.itemPrice,
            shippingCost: standardDelivery.price,
            totalPrice: itemDetails.itemPrice
        });

        //verify address in
        confirmationPage.verifyShippingAndBillingAddress({
            fullname: `${userInformation.firstname} ${userInformation.lastname}`,
            address: userInformation.streetAndHouseNumber,
            zipcode: userInformation.zipcode,
            city: userInformation.city,
            country: userInformation.country
        })

        confirmationPage.verifyDeliveryOption(standardDelivery.name);

        //order number
        confirmationPage.verifyOrderNumberDisplayed()
    })

})

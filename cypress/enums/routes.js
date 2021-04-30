const checkoutRoute = "/checkout"
const explore = "/explore";

const checkoutRoutes = {
    registration: `${checkoutRoute}/registration`,
    shipping: `${checkoutRoute}/shipping`,
    payment: `${checkoutRoute}/payment`,
    confirmation: `${checkoutRoute}/confirmation`
}

const exploreRoutes = {
    women: `${explore}/womens`
}

module.exports = {checkoutRoutes, exploreRoutes};

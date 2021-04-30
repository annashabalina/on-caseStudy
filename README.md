### Case study: Write an E2E test for the happy path of the checkout flow
This repo contains the solution for case study for QA.
I have chosen to implement a path that an unregistered user from Germany would have to go through to purchase an item from On.
This test does not cover validations for taxes, paying with gift cards or applying promotion codes.
Also it does not verify other payment options.

##### To run the test
1. run ``npm i`` to install necessary dependencies
2. Find the file `cypress.json` in the root folder and replace there the `*` with the username and `**` with password.
   Otherwise, the spec will fail with `401`.
3. Next there are two options to run the spec:
   - run ``npm test``: this will run the spec in headless Chrome 
    - run ``cypress:open`` to open Cypress and then manually select the spec
    
⚠️ The test `Checkout, step 2: Shipping Address` will fail after it fills shipping address
as once the form is submitted, response from ``/graphql`` will be 500.
So this stopped me to run all the next steps and to see if they will pass.
There is a screenshot in `screenshots` folder and a recording in `videos` folder to give you a bit more insight on what is happening.

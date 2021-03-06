### Case study: Write an E2E test for the happy path of the checkout flow
This repo contains the solution for case study for QA.
In the folder `strategyAndCases` you can find answers to the tasks 1 & 2 of the case study
about the testing strategy for checkout functionality and example of 2 test cases.
The `cypress` folder contains an automated test for a happy checkout path.
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

In the `pages` folder it would also be a better solution to move selectors outside of functions
and save them into variables. But considering time limitation and that there is only one spec and each selector
is used only once, for this specific case I have decided to go with a bit simpler approach. 

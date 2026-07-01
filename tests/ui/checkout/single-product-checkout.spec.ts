// spec: specs/ui/checkout/single-product-checkoutflow.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../../fixtures';
import { loadCredentials } from '../../../utils/credential-loader';
import { Logger } from '../../../utils/logger';

test.describe('Single Product Checkoutflow', () => {
    test('Single Product Checkout E2E Flow', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
        const logger = new Logger('Single Product Checkout');
        const credentials = loadCredentials('saucedemo', 'standard_user');
        
        // 1. Open the browser and login using credentials for saucedemo.standard_user from pfpt/secret.json
        logger.testStart('Starting checkout flow test');
        await loginPage.loginToPage(credentials.url, credentials.email, credentials.password);
        
        // 2. Click On first Add to cart button and store the product name & price added to the cart
        const productName = await inventoryPage.getFirstProductName();
        const productPrice = await inventoryPage.getFirstProductPrice();
        await inventoryPage.clickFirstAddToCart();
        
        // 3. Click On the shopping_cart_link
        await inventoryPage.clickShoppingCart();
        
        // 4. Validate the product name is visible Under Your Cart
        await cartPage.validateProductInCart(productName);
        
        // 5. Click On Checkout button
        await cartPage.clickCheckout();
        
        // 6. Validate Checkout: Your Information is visible
        await checkoutPage.validateCheckoutInfoPageVisible();
        
        // 7. Enter FirstName as 'Karthik'
        await checkoutPage.enterFirstName('Karthik');
        
        // 8. Enter LastName as 'Thontanaal'
        await checkoutPage.enterLastName('Thont');
        
        // 9. Enter Zip/Postal Code as 584128
        await checkoutPage.enterPostalCode('9999');
        
        // 10. Click on Continue Button
        await checkoutPage.clickContinue();
        
        // 11. Validate Item total contains price as same as captured in step2
        await checkoutPage.validateItemTotal(productPrice);
        
        // 12. Click On Finish Button
        await checkoutPage.clickFinish();
        
        // 13. Validate Thank you for your order! text is visible
        await checkoutPage.validateOrderComplete();
        
        // 14. Click On Back Home Button
        await checkoutPage.clickBackHome();
        
        logger.testEnd('Checkout flow test completed successfully');
    });
});
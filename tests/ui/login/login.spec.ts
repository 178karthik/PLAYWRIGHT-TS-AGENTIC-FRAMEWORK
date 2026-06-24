import { test, expect } from '../../../fixtures'
import { loadCredentials } from '../../../utils/credential-loader';
import { Logger } from '../../../utils/logger';

test.describe('Login Tests Overview',()=>{

    test('positive Login Tests', async({loginPage,inventoryPage})=>{
     const logger = new Logger('Login Tests')
     const credentials = loadCredentials('saucedemo','standard_user');
     logger.testStart("Launching the page now");
     console.log(credentials.email)
     await loginPage.loginToPage(credentials.url,credentials.email,credentials.password);
     await expect(inventoryPage.firstAddToCardButton).toBeVisible();
     logger.error("erros");
     logger.testEnd("Launching the page now");
    })
})
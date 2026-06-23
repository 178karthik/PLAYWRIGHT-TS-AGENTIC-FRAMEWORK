import { test, expect } from '../../../fixtures'

test.describe('Login Tests Overview',()=>{

    test('positive Login Tests', async({loginPage,inventoryPage})=>{
     await loginPage.loginToPage();
     await expect(inventoryPage.firstAddToCardButton).toBeVisible();
    })
})
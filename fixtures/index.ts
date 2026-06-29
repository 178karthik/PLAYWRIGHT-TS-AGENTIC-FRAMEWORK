import {test as base,BrowserContext,Page} from '@playwright/test'
import { LoginPage } from './LoginPage'
import {InventoryPage} from './InventoryPage'
import {APIClient} from '../api/APIClient'

type MyFixtures = {

context : BrowserContext,
page: Page,
loginPage :LoginPage,
inventoryPage :InventoryPage
api:APIClient
}

export const test = base.extend<MyFixtures>({

   context:async ({browser},use)=>{
    const context = await browser.newContext({storageState:undefined})
    await use(context);
    await context.clearCookies();
    await context.close();
   },
   page :async ({context},use)=>{
   const page = await context.newPage();
   await use(page);

   },
   loginPage :async({page},use)=>{
   await use(new LoginPage(page))
   },
   inventoryPage :async({page},use)=>{
   await use(new InventoryPage(page))
   },
   api:async({request},use)=>{
      await use(new APIClient(request))
   }
})

export {expect} from '@playwright/test'

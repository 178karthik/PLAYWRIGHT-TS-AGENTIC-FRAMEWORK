import {Page,Locator} from '@playwright/test'

export class InventoryPage {
    readonly page:Page;
    constructor(page:Page)
    {
        this.page = page
    }


    get firstAddToCardButton()
    {
        return this.page.getByRole('button',{name:'Add to cart'}).first()
    }

}
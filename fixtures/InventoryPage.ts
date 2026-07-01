import { Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get firstAddToCardButton() {
        return this.page.locator('[data-test="inventory-item"]').first().locator('button', { hasText: 'Add to cart' });
    }

    get firstProductName() {
        return this.page.locator('[data-test="inventory-item-name"]').first();
    }

    get firstProductPrice() {
        return this.page.locator('[data-test="inventory-item-price"]').first();
    }

    get shoppingCartLink() {
        return this.page.locator('[data-test="shopping-cart-link"]');
    }

    async clickFirstAddToCart() {
        await this.firstAddToCardButton.click();
    }

    async getFirstProductName(): Promise<string> {
        return await this.firstProductName.innerText();
    }

    async getFirstProductPrice(): Promise<string> {
        return await this.firstProductPrice.innerText();
    }

    async clickShoppingCart() {
        await this.shoppingCartLink.click();
    }
}
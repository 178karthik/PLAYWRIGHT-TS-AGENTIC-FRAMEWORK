import { Page, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get cartTitle() {
        return this.page.locator('[data-test="title"]');
    }

    get checkoutButton() {
        return this.page.locator('[data-test="checkout"]');
    }

    getCartItemTitle(productName: string) {
        return this.page.locator('[data-test="inventory-item-name"]').filter({ hasText: productName });
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async validateProductInCart(productName: string) {
        await expect(this.getCartItemTitle(productName)).toBeVisible();
    }
}

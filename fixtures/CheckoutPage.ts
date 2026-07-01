import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get checkoutTitle() {
        return this.page.locator('[data-test="title"]');
    }

    get firstNameInput() {
        return this.page.getByPlaceholder('First Name');
    }

    get lastNameInput() {
        return this.page.getByPlaceholder('Last Name');
    }

    get postalCodeInput() {
        return this.page.getByPlaceholder('Zip/Postal Code');
    }

    get continueButton() {
        return this.page.locator('[data-test="continue"]');
    }

    get finishButton() {
        return this.page.locator('[data-test="finish"]');
    }

    get backHomeButton() {
        return this.page.locator('[data-test="back-to-products"]');
    }

    get subtotalLabel() {
        return this.page.locator('.summary_subtotal_label');
    }

    get completeHeader() {
        return this.page.locator('[data-test="complete-header"]');
    }

    async validateCheckoutInfoPageVisible() {
        await expect(this.checkoutTitle).toContainText('Checkout: Your Information');
    }

    async enterFirstName(firstName: string) {
        await this.firstNameInput.pressSequentially(firstName);
        await this.page.waitForTimeout(1500)
    }

    async enterLastName(lastName: string) {
        await this.lastNameInput.pressSequentially(lastName);
        await this.page.waitForTimeout(1500)
    }

    async enterPostalCode(postalCode: string) {
        await this.postalCodeInput.pressSequentially(postalCode);
        await this.page.waitForTimeout(300)
    }

    async clickContinue() {
        await this.continueButton.waitFor({state:'visible',timeout:30000})
        await this.continueButton.click();
    }

    async validateItemTotal(expectedPrice: string) {
        await expect(this.subtotalLabel).toContainText(expectedPrice);
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async validateOrderComplete() {
        await expect(this.completeHeader).toContainText('Thank you for your order!');
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }
}

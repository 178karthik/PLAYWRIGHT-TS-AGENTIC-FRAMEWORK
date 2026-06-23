import {Page,Locator} from '@playwright/test'

export class LoginPage{

    readonly page :Page;
    constructor(page:Page)
    {
      this.page =page;
    }

    get userName()
    {
        return this.page.getByPlaceholder("Username")
    }
    get password()
    {
        return this.page.getByPlaceholder("Password")
    }

    get loginButton()
    {
        return this.page.getByRole('button',{name:'Login'})
    }
    async loginToPage()
    {
        await this.page.goto("https://www.saucedemo.com/");
        await this.userName.fill("standard_user");
        await this.password.fill("secret_sauce");
        await this.loginButton.click();
    }

}
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
    async loginToPage(url:string,userName:string,password:string)
    {
        await this.page.goto(url);
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();
    }

}
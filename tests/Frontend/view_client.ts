import { Locator, Page, expect } from '@playwright/test';

export class ViewClientsPage {

    readonly page: Page;
    readonly backBtn: Locator;
    readonly createClientBtn: Locator;
    readonly editClientDropDown: Locator;
    readonly deleteClientDropDown: Locator;
    readonly clientsList: Locator;


    constructor(page: Page) {
        this.page = page;

        this.backBtn = page.getByRole('link', { name: 'Back' });
        this.createClientBtn = page.getByRole('link', { name: 'Create Client' });
        this.editClientDropDown = page.getByText('Edit');  
        this.deleteClientDropDown = page.getByRole('button', { name: 'Delete' });
        this.clientsList = page.getByText('Clients');
    }


    async navigateToDashboard() {
        await this.backBtn.click();
        await this.page.waitForTimeout(2000);
    }
    async navigateToCreateClient() {
        await this.createClientBtn.click();
        await this.page.waitForTimeout(2000);
    }
    async verifyClientInList(name: string) {
        const clientItem = this.clientsList.getByText('Clients');
        
    }
}

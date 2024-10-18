import { Locator, Page } from '@playwright/test';

export class DashboardPage {
 
  readonly page: Page;
  readonly logoutBtn: Locator;
  readonly viewRoomBtn: Locator;
  readonly viewReservationBtn: Locator;
  readonly viewClientsBtn: Locator;
  readonly viewBillBtn: Locator;

 
  constructor(page: Page) {
    this.page = page;

  
    this.logoutBtn = page.getByRole('button', { name: 'Logout' }); 
    this.viewRoomBtn = page.locator('a[href="/rooms"]'); 
    this.viewReservationBtn = page.locator('a[href="/reservations"]'); 
    this.viewClientsBtn = page.locator('a[href="/clients"]'); 
    this.viewBillBtn = page.locator('a[href="/bills"]'); 
  }



  
  async performLogout() {
    await this.logoutBtn.click();
    await this.page.waitForTimeout(2000); 
  }

  
  async navigateToClients() {
    await this.viewClientsBtn.click();
    await this.page.waitForTimeout(2000); 
  }
}

import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './login';
import { DashboardPage } from './dashboard';
import { CreateClientsPage } from './create_client';
import { ViewClientsPage } from './view_client';
import { faker } from '@faker-js/faker';


test.describe('Client Tests', () => {
    
    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await page.goto('http://localhost:3000/login');
        await page.locator('input[type="text"]').fill('tester01');

        await page.locator('input[type="password"]').fill('GteteqbQQgSr88SwNExUQv2ydb7xuf8c');
        await page.getByRole('button', { name: 'Login' }).click();


        // Log in
        await expect(page.getByText(/Welcome tester01!/)).toBeVisible();
        await expect(page.locator('h1')).toHaveText('Tester Hotel');
        await page.waitForTimeout(2000);
    });


    test('test 01 - Login', async ({ page }) => {

        await expect(page.getByText('Welcome tester01!')).toBeVisible();
    });


    test('test 02 - Navigate to Clients Page', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        await dashboardPage.navigateToClients();
        await expect(page.getByText('Clients')).toBeVisible();
    });
    test('test 03 - Create New Client', async ({ page }) => {
        const dashboardPage = new DashboardPage(page);
        const viewClientsPage = new ViewClientsPage(page);
        const createClientsPage = new CreateClientsPage(page);
        
        await dashboardPage.navigateToClients();
        await page.goto('http://localhost:3000/clients');


        const clientName = faker.person.fullName(); // Generate a random name
        const clientEmail = faker.internet.email(); // Generate a random email
        const clientPhone = faker.phone.number(); // Generate a random phone number

        await viewClientsPage.navigateToCreateClient();
        await createClientsPage.createNewClient(clientName, clientEmail, clientPhone);
        await viewClientsPage.verifyClientInList(clientName);
    });
});

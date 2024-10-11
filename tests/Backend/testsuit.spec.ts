import { test, expect } from '@playwright/test';
import { APIHelper } from './apihelper';
import { generateRandomClientsPlayloud } from './testData';



test.describe('Test Suite 01', () => {
    let apiHelper: APIHelper;
    const BASE_URL = process.env.BASE_URL! 

    // Before all tests, perform login
    test.beforeAll(async ({ request }) => {
        apiHelper = new APIHelper(BASE_URL, process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);


        const loginResponse = await apiHelper.performLogin(request);
        expect(loginResponse.ok()).toBeTruthy();

        const loginData = await loginResponse.json();
        expect(loginData).toHaveProperty('username', process.env.TEST_USERNAME);
        expect(loginData).toHaveProperty('token');
    });

    // Test Case 01: Log in
    test('Test Case 01: Log in', async ({ request }) => {
        const loginResponse = await apiHelper.performLogin(request);
        const loginData = await loginResponse.json();

        expect(loginResponse.ok()).toBeTruthy();
        expect(loginData).toMatchObject({
            username: process.env.TEST_USERNAME,
            token: expect.any(String),
        });
    });

    // Test Case 03: Create a new client
    test('Test Case 03: Create a new client', async ({ request }) => {
        const clientData = generateRandomClientsPlayloud();

        const response = await apiHelper.createClient(request, clientData);
        expect(response).toMatchObject({
            name: clientData.name,
            email: clientData.email,
            telephone: clientData.telephone,
            id: expect.any(Number),
            created: expect.any(String),
        });
    });
});

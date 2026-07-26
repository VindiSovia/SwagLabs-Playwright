import { test, expect } from "@playwright/test";
import { LoginPage } from "../../helpers/LoginPage.js";

test.describe('Login dengan username yang tidak valid', () =>{
    test('Username invalid', async({page}) =>{
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.INVALID_USERNAME, process.env.STANDARD_PASSWORD);

        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
    });
});

test.describe('Login dengan password yang tidak valid', () =>{
    test('Password invalid', async({page}) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.login(process.env.STANDARD_USERNAME, process.env.INVALID_PASSWORD);

        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
    });
})
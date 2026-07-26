const { test, expect } = require('@playwright/test');
const LoginPage = require('../../helpers/LoginPage');

test('Locked out user cannot login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        process.env.LOCKED_USERNAME,
        process.env.STANDARD_PASSWORD
    );

    await expect(page.locator('[data-test="error"]'))
        .toContainText('Sorry, this user has been locked out.');

});